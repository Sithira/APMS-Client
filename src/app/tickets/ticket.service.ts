import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TicketService {

    ticketUrl = 'http://localhost:3333/api/v1/projects/';

    projectId: string;

    sprintId: string;

    ticketId: string;

    constructor(private http: HttpClient) {
    }

    index() {
        return this.http.get<any>(this.ticketUrl + this.projectId + '/' + this.sprintId + '/tickets');
    }

    show(ticketId, loadRelations) {
        this.ticketId = ticketId;

        const url = this.ticketUrl + this.projectId + '/sprints/' + this.sprintId + '/tickets/' + this.ticketId;

        if (loadRelations) {
            return this.http.get<any>(url + + '/?relations=true');
        }

        return this.http.get<any>(url);
    }
}
