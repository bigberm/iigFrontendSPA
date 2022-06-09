import { AuthenticationService } from './service/authentication.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent implements OnInit {
    menuitems: MenuItem[];

    constructor(
        public appMain: AppMainComponent,
        private authenService: AuthenticationService,
        private router: Router
    ) {}
    ngOnInit(): void {
        this.menuitems = [
            {
                label: this.authenService.getCurrentUser(),
            },
            {
                label: 'Profile',
                icon: 'pi pi-fw pi-user-edit',
                routerLink: '/main/userprofile',
                command: (event) => {
                    this.router.navigate(['pages/userprofileform']);
                },
            },
            {
                label: 'Logout',
                icon: 'pi pi-fw pi pi-sign-out',
                command: (event) => {
                    this.logout();
                },
            },
        ];
    }
    logout() {
        this.authenService.logedOut();

        this.router.navigate(['pages/login']);
    }
}
