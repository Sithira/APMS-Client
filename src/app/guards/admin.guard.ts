import {Injectable} from '@angular/core';
import {CanActivate, CanActivateChild, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanActivateChild {
    constructor(private auth: AuthService, private router: Router) {

    }

    canActivate(): boolean {

        if (this.auth.isTokenPresent() && (this.auth.isAdmin() || this.auth.isManager())) {
            return true;
        } else {
            this.router.navigate(['login']);
            return false;
        }
    }

    canActivateChild(): boolean {
        return this.canActivate();
    }
}
