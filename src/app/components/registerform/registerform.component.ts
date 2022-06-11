import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { UserService } from 'src/app/service/userservice';
import { UserRegister } from 'src/app/viewmodel/userregister';

@Component({
    selector: 'app-registerform',
    templateUrl: './registerform.component.html',
    styleUrls: ['./registerform.component.scss'],
    providers: [MessageService],
})
export class RegisterformComponent implements OnInit {
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
    emailFormat: RegExp =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    @ViewChild('fileInput') fileInput: FileUpload;

    uploadedFiles: any[] = [];
    fileImg: File;
    isUserExist: boolean;
    constructor(
        private service: MessageService,
        private router: Router,
        private userService: UserService
    ) {}

    ngOnInit(): void {
        this.intitialForm();
        this.isUserExist = false;
    }
    get txtPassword1() {
        return this.newUserForm.get('txtPassword1')!;
    }
    get txtPassword2() {
        return this.newUserForm.get('txtPassword2')!;
    }
    get txtEmail() {
        return this.newUserForm.get('txtEmail')!;
    }
    get txtusername() {
        return this.newUserForm.get('txtusername')!;
    }

    saveEvent() {
        //disable save button when form invalid
        let newuser = new UserRegister();
        newuser.UserName = this.valUserName;
        newuser.Email = this.emailVal;
        newuser.FirstName = this.valLastName;
        newuser.LastName = this.valLastName;
        newuser.Password = this.valPassword1;
        newuser.ConfirmPassword = this.valPassword2;
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
            txtPassword1: new FormControl('', Validators.required),
            txtPassword2: new FormControl(''),
            txtEmail: new FormControl('', [
                Validators.pattern(this.emailFormat),
                Validators.email,
            ]),
        });
    }

    onselectfile(event) {
        // this.uploadedFiles = [];
        // for (let file of event.files) {
        //     this.uploadedFiles.push(file);
        //     this.strFileType = file.type;
        // }
        this.fileImg = <File>event.files[0];
    }

    isValidPassword(): boolean {
        return (
            this.newUserForm.controls['txtPassword1'].value !=
                this.newUserForm.controls['txtPassword2'].value &&
            (this.newUserForm.controls['txtPassword2'].dirty ||
                this.newUserForm.controls['txtPassword2'].touched)
        );
    }
    OnBackLogin() {
        this.router.navigateByUrl('pages/login');
    }
    CheckUserExist() {
        this.msgs = [];
        if (this.valUserName != '') {
            this.userService
                .getUserNameIsExist(this.valUserName)
                .subscribe((res) => {
                    if (res == 'true') {
                        this.isUserExist = true;

                        this.msgs.push({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Username alreay exist!',
                        });
                    }
                });
        }
    }
    get IsuserExists() {
        return this.isUserExist!;
    }
}
