import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private usersUrl = 'http://localhost:3333/api/v1/users/';

    constructor(
        private http: HttpClient,
        private auth: AuthService) {
    }

    /**
     * Get all users from database
     *
     * @return {Observable<any>}
     */
    index() {
        return this.http.get<any>(this.usersUrl);
    }

    /**
     * Get users from filtered type
     *
     * @param type
     * @return {Observable<any>}
     */
    getType(type) {
        return this.http.get<any>(this.usersUrl + 'get-type/?type=' + type);
    }

    /**
     * Get the user
     *
     * @param userId
     * @return {Observable<any>}
     */
    show(userId) {
        return this.http.get<any>(this.usersUrl + userId);
    }

    save(userId, payLoad) {

        const url = this.usersUrl + userId;

        return this.http.patch(url, payLoad);
    }
}
