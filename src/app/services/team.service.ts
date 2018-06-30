import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TeamService {

    private teamURL = 'http://localhost:3333/api/v1/teams/';

    constructor(private http: HttpClient) {
    }

    /**
     * Get the _id and name of all teams
     *
     * @return {Observable<any>}
     */
    pluck() {
        console.log(this.teamURL);
        return this.http.get<any>(this.teamURL + '?pluck=true');
    }

}
