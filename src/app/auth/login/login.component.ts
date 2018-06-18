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
                localStorage.setItem('user', JSON.stringify(res.data.user));
                localStorage.setItem('access-token', res.data.payLoad.token);
                this.router.navigate(['/dashboard']);
            }, err => console.log(err)
        );
    }

}
