import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SprintsService} from './sprints.service';

@Injectable({
    providedIn: 'root'
})
export class TicketService {

    ticketUrl = 'http://localhost:3333/api/v1/projects/';

    constructor(private http: HttpClient, private sprintService: SprintsService) {
    }

    /**
     * Get Sprint
     *
     * @param projectId
     * @param sprintId
     * @return {Observable<any>}
     */
    sprint(projectId, sprintId) {
        return this.sprintService.show(projectId, sprintId, null);
    }

    /**
     * Show all tickets in a sprint
     *
     * @return {Observable<any>}
     */
    index(projectId, sprintId) {
        return this.http.get<any>(this.ticketUrl + projectId + '/' + sprintId + '/tickets');
    }

    /**
     * Show a single ticket detail (with relations and without relations)
     *
     * @param projectId
     * @param sprintId
     * @param ticketId
     * @param withRelations
     * @return {Observable<any>}
     */
    show(projectId, sprintId, ticketId, withRelations) {

        // main ticket URL
        const url = this.ticketUrl + projectId + '/sprints/' + sprintId + '/tickets/' + ticketId;

        // load the nested relationships
        if (withRelations === 'relations') {
            return this.http.get<any>(url + +'/?relations=true');
        }

        // pluck name and id
        if (withRelations === 'pluck') {
            return this.http.get<any>(url + +'/?pluck=true');
        }

        // return the base url
        return this.http.get<any>(url);
    }

    /**
     * Update a given ticket
     *
     * @param projectId
     * @param sprintId
     * @param ticketId
     * @param payLoad
     * @return {Observable<any>}
     */
    update(projectId, sprintId, ticketId, payLoad) {

        const url = this.ticketUrl + projectId + '/sprints/' + sprintId + '/tickets/' + ticketId;

        return this.http.patch<any>(url, payLoad);
    }

    /**
     * Delete a given project ( SOFT or Hard )
     *
     * @param projectId
     * @param sprintId
     * @param ticketId
     * @param type
     * @return {Observable<Object>}
     */
    delete(projectId, sprintId, ticketId, type) {

        let url = null;

        if (type === 'soft') {
            url = this.ticketUrl + projectId + '/sprints/' + sprintId + '/tickets/' + ticketId;
        } else {
            url = this.ticketUrl + projectId + '/sprints/' + sprintId + '/tickets/' + ticketId + '/?forceDestroy=true';
        }

        return this.http.delete(url);

    }
}
