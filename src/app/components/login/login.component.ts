import { AuthenticationService } from './../../service/authentication.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigService } from '../../service/app.config.service';
import { AppConfig } from '../../api/appconfig';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { SessionService } from 'src/app/service/session.service';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [
        `
            :host ::ng-deep .p-password input {
                width: 100%;
                padding: 1rem;
            }

            :host ::ng-deep .pi-eye {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }

            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
        `,
    ],
    providers: [MessageService],
})
export class LoginComponent implements OnInit, OnDestroy {
    //  valCheck: string[] = ['remember'];
    msgs: Message[] = [];
    passwordVal: string = '';
    usernameVal: string = '';

    config: AppConfig;

    subscription: Subscription;

    constructor(
        public configService: ConfigService,
        private authService: AuthenticationService,
        private router: Router,
        private service: MessageService,
        private sessionService: SessionService
    ) {}

    ngOnInit(): void {
        this.config = this.configService.config;
        this.subscription = this.configService.configUpdate$.subscribe(
            (config) => {
                this.config = config;
            }
        );
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    OnLogin() {
        this.authService.login(this.usernameVal, this.passwordVal).subscribe(
            (next) => {
                localStorage.setItem('currentUser', this.usernameVal);
                this.sessionService.setItem('currentUser', this.usernameVal);
            },
            (error) => {
                this.msgs = [
                    {
                        severity: 'error',
                        summary: '',
                        detail: 'Invalid username or password.',
                    },
                ];
            },
            () => {
                this.router.navigate(['pages/userprofileform']);
            }
        );
    }
    OnclickReg() {
        this.router.navigateByUrl('pages/registerform');
    }
    CheckValid() {
        return this.passwordVal == '' && this.usernameVal == '';
    }
}
