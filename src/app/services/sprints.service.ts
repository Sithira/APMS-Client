import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SprintsService {

    private sprintUrl = 'http://localhost:3333/api/v1/projects/';

    constructor(private http: HttpClient) {
    }

    /**
     * Get the project
     *
     * @return {Observable<any>}
     */
    getProject(projectId) {
        return this.http.get<any>(this.sprintUrl + projectId);
    }

    /**
     * Get all the sprints of a project
     *
     * @return {Observable<any>}
     */
    index(projectId, withRelations) {

        let url = this.sprintUrl + projectId  + '/sprints';

        if (withRelations === 'pluck') {
            url = url + '?pluck=true';
        }

        return this.http.get<any>(url);
    }

    /**
     * Get an sprint (with relations, with plucks or just the sprint)
     *
     * @param projectId
     * @param sprintId
     * @param withRelations
     * @return {Observable<any>}
     */
    show(projectId, sprintId, withRelations) {

        // load relations with the project
        if (withRelations === 'relations') {
            return this.http.get<any>(this.sprintUrl + projectId + '/sprints/' + sprintId + '/?relations=true');
        }

        // load only the plucks
        if (withRelations === 'pluck') {
            return this.http.get<any>(this.sprintUrl + projectId + '/sprints/' + sprintId + '/?pluck=true');
        }

        // return the sprint only
        return this.http.get<any>(this.sprintUrl + projectId + '/sprints/' + sprintId);
    }

    /**
     * Update the sprint
     *
     * @param projectId
     * @param sprintId
     * @param payLoad
     * @return {Observable<any>}
     */
    update(projectId, sprintId, payLoad) {
        return this.http.patch<any>(this.sprintUrl + projectId + '/sprints/' + sprintId, payLoad);
    }

    /**
     * Delete a given sprint ( soft delete or hard delete )
     *
     * @param projectId
     * @param sprintId
     * @param type Delete type of the sprint
     * @return {Observable<any>}
     */
    delete(projectId, sprintId, type) {
        if (type === 'soft') {
            return this.http.delete<any>(this.sprintUrl + projectId + '/sprints/' + sprintId);
        }

        return this.http.delete<any>(this.sprintUrl + projectId + '/sprints/' + sprintId + '/forceDestroy=true');
    }
}
