import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    private username: string;

    constructor(private auth: AuthService, private router: Router) {}

    ngOnInit() {
        this.username = this.auth.getUser().name;
    }

    logout() {
        this.auth.logout();

        this.router.navigate(['login']);
    }

    isLoggedIn() {
        return this.auth.isLoggedIn;
    }

    getUsername() {
        return this.username;
    }
}
