import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SessionService } from './session.service';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    baseUrl = environment.apiUrl;
    jwtHelper = new JwtHelperService();
    decodedToken: any;
    currentUser: any;
    roleAs: string;
    isLogin = false;

    constructor(
        private http: HttpClient,
        private sessionService: SessionService
    ) {}

    login(userName: string, password: string) {
        var data =
            'username=' +
            userName +
            '&password=' +
            password +
            '&grant_type=password';

        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/x-www-urlencoded',
            'No-Auth': 'True',
        });

        return this.http
            .post(this.baseUrl + 'token', encodeURI(data), {
                headers: reqHeader,
            })
            .pipe(
                map((response: any) => {
                    console.log(response);
                    try {
                        localStorage.setItem('STATE', 'true');
                        localStorage.setItem('userId', response.userId);
                        localStorage.setItem('currentUser', response.userName);
                        this.sessionService.setItem(
                            'currentUser',
                            response.userName
                        );
                        if (JSON.stringify(response.access_token).length > 0) {
                            localStorage.setItem(
                                'token',
                                response.access_token
                            );
                        }
                    } catch (error) {
                        console.log(error.message);
                    }
                })
            );
    }

    loggedIn() {
        const token = localStorage.getItem('token');

        return !this.jwtHelper.isTokenExpired(token) && this.isLoggedIn();
    }
    logedOut() {
        localStorage.setItem('currentUser', '');
        localStorage.removeItem('currentUser');
        localStorage.setItem('STATE', 'false');
        localStorage.removeItem('STATE');
        localStorage.setItem('userId', '');
        localStorage.removeItem('userId');
        this.sessionService.removeItem('currentUser');
        this.isLogin = false;

        return of({ success: this.isLogin, role: '' });
    }
    isLoggedIn() {
        const loggedIn = localStorage.getItem('STATE');

        if (loggedIn == 'true') this.isLogin = true;
        else this.isLogin = false;
        return this.isLogin;
    }

    getCurrentUser() {
        let userVal = localStorage.getItem('currentUser');

        return userVal;
    }
    getUserID() {
        let idVal = localStorage.getItem('userId');

        return idVal;
    }
}
