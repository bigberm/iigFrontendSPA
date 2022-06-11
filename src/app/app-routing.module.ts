import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppMainComponent } from './app.main.component';

import { LoginComponent } from './components/login/login.component';

import { NotfoundComponent } from './components/notfound/notfound.component';

import { RegisterformComponent } from './components/registerform/registerform.component';
import { UserprofileformComponent } from './components/userprofileform/userprofileform.component';
import { AuthGuard } from './guard/auth.gaurd';
@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: '',
                    component: AppMainComponent,
                    children: [
                        {
                            path: '',
                            component: UserprofileformComponent,
                            canActivate: [AuthGuard],
                        },

                        {
                            path: 'pages/userprofileform',
                            component: UserprofileformComponent,
                            canActivate: [AuthGuard],
                        },
                    ],
                },

                { path: 'pages/login', component: LoginComponent },
                {
                    path: 'pages/registerform',
                    component: RegisterformComponent,
                },

                { path: 'pages/notfound', component: NotfoundComponent },

                { path: '**', redirectTo: 'pages/notfound' },
            ],
            { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
