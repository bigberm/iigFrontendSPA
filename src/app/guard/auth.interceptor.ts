import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpUserEvent,
    HttpEvent,
    HttpErrorResponse,
    HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (req.headers.get('No-Auth') == 'True')
            return next.handle(req.clone());

        if (localStorage.getItem('token') != null) {
            const clonedreq = req.clone({
                headers: req.headers.set(
                    'Authorization',
                    'Bearer ' + localStorage.getItem('token')
                ),
            });
            return next.handle(clonedreq);
        } else {
            this.router.navigateByUrl('pages/login');
        }
    }
}
