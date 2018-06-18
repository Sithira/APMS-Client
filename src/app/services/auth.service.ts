import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private authLoginUrl = 'http://localhost:3333/auth/login';

    private access_token: string;

    private user: string;

    constructor(private http: HttpClient) {
    }

    /**
     * Login the user to the system
     *
     * @param user
     * @return {Observable<any>}
     */
    login(user) {
        return this.http.post<any>(this.authLoginUrl, user);
    }

    /**
     * Logout the user from the system
     */
    logout() {
        this.access_token = undefined;
        this.user = undefined;
        localStorage.removeItem('access-token');
        localStorage.removeItem('auth-user');
    }

    /**
     * Set the user object to the localStorage
     * @param user
     */
    setUser(user) {
        delete user.email;
        this.user = JSON.stringify(user);
        localStorage.setItem('auth-user', this.user);
    }

    /**
     * Set the token of the auth'ed user
     * @param token
     */
    setToken(token) {
        this.access_token = token;
        localStorage.setItem('access-token', this.access_token);
    }

    /**
     * Check if the token is present on the local storage
     *
     * @return {boolean}
     */
    isTokenPresent() {
        return !!this.getToken();
    }

    /**
     * Get the token from the local storage
     *
     * @return {string}
     */
    getToken() {
        this.access_token = localStorage.getItem('access-token');
        return this.access_token;
    }

    /**
     * Get the user from the local storage
     *
     * @return {any}
     */
    getUser() {
        this.user = localStorage.getItem('auth-user');
        return JSON.parse(this.user);
    }

    isAdmin() {
        return this.getUser().type === 'admin';
    }

    isClient() {
        return this.getUser().type === 'client';
    }

    isManager() {
        return this.getUser().type === 'manager';
    }


}
