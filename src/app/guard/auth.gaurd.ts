import { Injectable } from '@angular/core';
import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild,
    CanDeactivate,
    CanLoad,
    UrlTree,
    Route,
    UrlSegment,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';
import { SessionService } from '../service/session.service';

@Injectable()
export class AuthGuard
    implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad
{
    constructor(
        private authService: AuthenticationService,
        private router: Router,
        private sessionService: SessionService
    ) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        let url: string = state.url;

        return this.checkUserLogin(next, url);
    }
    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this.canActivate(next, state);
    }
    canDeactivate(
        component: unknown,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return true;
    }
    canLoad(
        route: Route,
        segments: UrlSegment[]
    ): Observable<boolean> | Promise<boolean> | boolean {
        return true;
    }

    checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
        if (
            this.authService.isLoggedIn() &&
            this.authService.getCurrentUser() != null
        ) {
            return true;
        }
        this.router.navigate(['pages/login']);
        return false;
    }
    // getCurrentUser() {
    //     try {
    //         const userData = this.sessionService.getItem('currentUser');
    //         return userData.userName;
    //     } catch (err) {
    //         return null;
    //     }
    // }
}
