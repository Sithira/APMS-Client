import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SprintsService {

    projectId: string;

    sprintId: string;

    private sprintUrl = 'http://localhost:3333/api/v1/projects/';

    constructor(private http: HttpClient) {
    }

    getProject() {
        return this.http.get<any>(this.sprintUrl + this.projectId);
    }

    index() {
        return this.http.get<any>(this.sprintUrl + this.projectId + '/sprints');
    }

    show(sprintId, loadRelations) {
        if (loadRelations) {
            return this.http.get<any>(this.sprintUrl + this.projectId + '/sprints/' + sprintId + '/?relations=true');
        }

        return this.http.get<any>(this.sprintUrl + this.projectId + '/sprints/' + sprintId);
    }
}
