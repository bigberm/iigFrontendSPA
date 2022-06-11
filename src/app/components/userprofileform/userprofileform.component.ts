import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { UserService } from 'src/app/service/userservice';
import { UserRegister } from 'src/app/viewmodel/userregister';

@Component({
    selector: 'app-userprofileform',
    templateUrl: './userprofileform.component.html',
    styleUrls: ['./userprofileform.component.scss'],
    providers: [MessageService],
})
export class UserprofileformComponent implements OnInit {
    msgs: Message[] = [];
    valPassword1: string;
    valPassword2: string;
    valFirstName: string;
    valLastName: string;
    valUserName: string;
    newUserForm!: FormGroup;
    acceptedFiles: string = '.png, .jpg, .gif';
    strFileType: string;
    emailVal: string;
    displayModal: boolean;
    emailFormat: RegExp =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    @ViewChild('fileInput') fileInput: FileUpload;

    uploadedFiles: any[] = [];
    fileImg: File;
    thumbnail: any;

    constructor(
        private service: MessageService,
        private router: Router,
        private userService: UserService,
        private authService: AuthenticationService,
        private sanitizer: DomSanitizer
    ) {}

    ngOnInit(): void {
        this.intitialForm();

        if (this.authService.getUserID()) {
            //get user info
            this.userService
                .getUserInfo(this.authService.getUserID())
                .subscribe((res: any) => {
                    console.log(res);
                    this.valUserName = res.userName;
                    this.valFirstName = res.firstName;
                    this.valLastName = res.lastName;
                    this.emailVal = res.email;
                });
            this.userService
                .getProfileImage(this.authService.getUserID())
                .subscribe((res: any) => {
                    var binaryData = [];
                    binaryData.push(res);
                    let objectURL = URL.createObjectURL(
                        new Blob(binaryData, { type: res.type })
                    );
                    this.thumbnail =
                        this.sanitizer.bypassSecurityTrustUrl(objectURL);
                });
        }
    }
    onUpload(event) {
        this.userService
            .uploadImageFile(event.files, this.authService.getUserID())
            .subscribe((res) => {
                this.msgs = [];
                this.msgs.push({
                    severity: 'success',
                    summary: 'success',
                    detail: 'Upload success',
                });
                this.userService
                    .getProfileImage(this.authService.getUserID())
                    .subscribe((res: any) => {
                        var binaryData = [];
                        binaryData.push(res);
                        let objectURL = URL.createObjectURL(
                            new Blob(binaryData, { type: res.type })
                        );
                        this.thumbnail =
                            this.sanitizer.bypassSecurityTrustUrl(objectURL);
                    });
            });
    }
    // get txtPassword1() {
    //     return this.newUserForm.get('txtPassword1')!;
    // }
    // get txtPassword2() {
    //     return this.newUserForm.get('txtPassword2')!;
    // }
    get txtEmail() {
        return this.newUserForm.get('txtEmail')!;
    }

    saveEvent() {
        //disable save button when form invalid
        let newuser = new UserRegister();
        newuser.UserName = this.valUserName;
        newuser.Email = this.emailVal;
        newuser.FirstName = this.valLastName;
        newuser.LastName = this.valLastName;

        if (this.fileImg.size > 0) {
            newuser.ProfileImage = this.fileImg;
        }

        this.userService.createRegisterUser(newuser).subscribe(
            (res) => {
                console.log(res);
                if (res == 'Success') {
                    this.msgs = [];
                    this.msgs.push({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Please go to login page.',
                    });
                } else {
                    this.msgs = [];
                    this.msgs.push({
                        severity: 'error',
                        summary: 'Error',
                        detail: res,
                    });
                }
            },
            (err: HttpErrorResponse) => {}
        );
    }
    intitialForm() {
        this.newUserForm = new FormGroup({
            txtfirstName: new FormControl('', Validators.required),
            txtlastName: new FormControl('', Validators.required),
            txtusername: new FormControl('', [
                Validators.required,
                Validators.pattern('^[A-Za-z0-9_]+$'),
                Validators.maxLength(12),
            ]),
            txtPassword1: new FormControl('', [Validators.minLength(6)]),
            txtPassword2: new FormControl(''),
            txtEmail: new FormControl('', [
                Validators.pattern(this.emailFormat),
                Validators.email,
            ]),
        });
    }

    onselectfile(event) {
        this.fileImg = <File>event.files[0];
    }

    savePasswordEvent() {
        this.userService
            .updatePassword({
                UserId: this.authService.getUserID(),
                OldPassword: this.valPassword1,
                NewPassword: this.valPassword2,
                ConfirmPassword: this.valPassword2,
            })
            .subscribe((res) => {
                if (res == 'Success') {
                    this.msgs = [];
                    this.msgs.push({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Changed password',
                    });
                } else {
                    this.msgs = [];
                    this.msgs.push({
                        severity: 'error',
                        summary: 'Error',
                        detail: res,
                    });
                }
            });
    }
    saveUserProfileEvent() {
        this.userService
            .updateUserProfile({
                UserId: this.authService.getUserID(),
                FirstName: this.valFirstName,
                LastName: this.valLastName,
                Email: this.emailVal,
            })
            .subscribe((res) => {
                console.log(res);
                if (res == 'Success') {
                    this.msgs = [];
                    this.msgs.push({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Data has been update',
                    });
                } else {
                    this.msgs = [];
                    this.msgs.push({
                        severity: 'error',
                        summary: 'Error',
                        detail: res,
                    });
                }
            });
    }
}
