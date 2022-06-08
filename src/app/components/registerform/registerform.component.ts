import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';

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
    emailVal:string;
    emailFormat: RegExp =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    @ViewChild('fileInput') fileInput: FileUpload;

    uploadedFiles: any[] = [];
    constructor(private service: MessageService,private router: Router) {}

    ngOnInit(): void {
        this.intitialForm();
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
    saveEvent() {}
    intitialForm() {
        this.newUserForm = new FormGroup({
            txtfirstName: new FormControl('', Validators.required),
            txtlastName: new FormControl('', Validators.required),
            txtusername: new FormControl('', Validators.required),
            txtPassword1: new FormControl('', [Validators.minLength(6)]),
            txtPassword2: new FormControl(''),
            txtEmail: new FormControl("", [
                Validators.pattern(this.emailFormat),
                Validators.email,
              ]),
        });
    }

    onselectfile(event) {
        this.uploadedFiles = [];
        for (let file of event.files) {
            this.uploadedFiles.push(file);
        }
    }

    isValidPassword(): boolean {
        return (
            this.newUserForm.controls['txtPassword1'].value !=
                this.newUserForm.controls['txtPassword2'].value &&
            (this.newUserForm.controls['txtPassword2'].dirty ||
                this.newUserForm.controls['txtPassword2'].touched)
        );
    }
    OnBackLogin(){
        this.router.navigateByUrl('pages/login');
    }
}
