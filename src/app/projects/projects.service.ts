import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ProjectsService {

    // project ID
    private projectId = '';

    // API End Point for the project's
    private projectsUrl = 'http://localhost:3333/api/v1/projects/';

    constructor(private http: HttpClient) {
    }

    /**
     * Get all projects from the API. depending on the client.
     *
     * @return {Observable<any>}
     */
    index() {
        return this.http.get<any>(this.projectsUrl);
    }

    /**
     * Load details about a project via API.
     *
     * @param projectId
     * @param withRelations
     * @return {Observable<any>}
     */
    show(projectId, withRelations) {
        this.projectId = projectId;

        // check for relations load request
        if (withRelations) {
            return this.http.get<any>(this.projectsUrl + this.projectId + '/?relations=true');
        }

        // just load the project only.
        return this.http.get<any>(this.projectsUrl + this.projectId);
    }

    edit(projectId) {

    }

    update(projectId) {

    }

}
