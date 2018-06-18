import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    private projectId = '';

    private projectUrl = 'http://localhost:3333/api/v1/projects/' + this.projectId;

    constructor(private http: HttpClient) {
    }
}
