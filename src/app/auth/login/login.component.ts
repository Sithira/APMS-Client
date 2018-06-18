import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginDetails = {};

    constructor(private auth: AuthService, private router: Router) {
    }

    ngOnInit() {
    }

    login() {
        this.auth.login(this.loginDetails).subscribe(res => {
                console.log(res);

                // set the token to the localStorage
                this.auth.setToken(res.data.payLoad.token);

                // set the user to the localStorage
                this.auth.setUser(res.data.user);

                // navigate the user to the dashboard.
                this.router.navigate(['projects']);
            }, err => {
                console.log(err);
            }
        );
    }

}
