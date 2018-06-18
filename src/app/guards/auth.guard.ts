import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private auth: AuthService, private router: Router) {

    }

    canActivate(): boolean {

        if (this.auth.isTokenPresent()) {

            this.auth.isLoggedIn = true;
            return true;
        } else {

            this.auth.isLoggedIn = false;
            this.router.navigate(['login']);

            return false;
        }
    }

}
