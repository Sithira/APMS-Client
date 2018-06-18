import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {objectify} from 'tslint/lib/utils';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public isLoggedIn = false;

    private authLoginUrl = 'http://localhost:3333/auth/login';

    private access_token: string;

    private user: string;

    constructor(private http: HttpClient) {
    }

    login(user) {
        return this.http.post<any>(this.authLoginUrl, user);
    }

    logout() {
        this.isLoggedIn = false;
        this.access_token = undefined;
        this.user = undefined;
        localStorage.removeItem('access-token');
    }

    isTokenPresent() {
        this.access_token = localStorage.getItem('access-token');
        return !! localStorage.getItem('access-token');
    }

    getToken() {
        return this.access_token;
    }

    getUser() {
        this.user = localStorage.getItem('user');
        return JSON.parse(this.user);
    }
}
