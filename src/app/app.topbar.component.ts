import { AuthenticationService } from './service/authentication.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit {

    menuitems: MenuItem[];

    constructor(public appMain: AppMainComponent,private authenService : AuthenticationService) { }
    ngOnInit(): void {
        this.menuitems = [
            {
              label: "Welcome " + this.authenService.getCurrentUser(),
            },
            {
              label: "Profile",
              icon: "pi pi-fw pi-user-edit",
              routerLink: "/main/userprofile",
              command: (event) => {},
            },
            {
              label: "Logout",
              icon: "pi pi-fw pi pi-sign-out",
              command: (event) => {
                this.logout();
              },
            },
          ];
    }
    logout() {
     
        this.authenService.logedOut();
        this.sessionService.removeItem("active-menu");
        this.router.navigate(["/login"]);
      }
    
}
