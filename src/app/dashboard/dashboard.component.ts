import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    user: any;

    constructor(private auth: AuthService) {
    }

    ngOnInit() {
        this.user = this.auth.getUser();
    }

    getUser() {
        return this.auth;
    }

}
