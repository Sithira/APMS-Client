import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ProjectsService {

    // project ID
    private projectId: string;

    // API End Point for the project's
    private projectsUrl = 'http://localhost:3333/api/v1/projects/';

    constructor(private http: HttpClient) {
    }

    /**
     * Get all projects from the API. depending on the client.
     *
     * @return {Observable<any>}
     */
    index(pluck) {

        if (pluck === 'pluck') {
            return this.http.get<any>(this.projectsUrl + '?pluck=true');
        }

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
        if (withRelations === 'relations') {
            return this.http.get<any>(this.projectsUrl + this.projectId + '?relations=true');
        }

        if (withRelations === 'pluck') {
            return this.http.get<any>(this.projectsUrl + this.projectId + '/?pluck=true');
        }

        // just load the project only.
        return this.http.get<any>(this.projectsUrl + this.projectId);
    }

    /**
     * Update the project given with the Id of the project
     *
     * @param projectId
     * @param payLoad
     * @return {Observable<any>}
     */
    update(projectId, payLoad) {
        return this.http.patch<any>(this.projectsUrl + this.projectId, payLoad);
    }

    /**
     * Destroy a project from the database.
     *
     * @param payLoad
     * @return {Observable<any>}
     */
    create(payLoad) {
        return this.http.post<any>(this.projectsUrl, payLoad);
    }

    /**
     * Soft Delete / Force delete an existing project
     *
     * @param projectId
     * @param type
     * @return {Observable<any>}
     */
    destroy(projectId, type) {

        if (type === 'soft') {
            return this.http.delete<any>(this.projectsUrl + projectId);
        }

        return this.http.delete<any>(this.projectsUrl + projectId + '/?forceDestroy=true');
    }
}
