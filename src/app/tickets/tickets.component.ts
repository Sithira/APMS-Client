import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TicketService} from '../services/ticket.service';
import {HttpErrorResponse} from '@angular/common/http';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
    selector: 'app-tickets',
    templateUrl: './tickets.component.html',
    styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

    tickets = [];

    constructor(
        private activeRoute: ActivatedRoute,
        private ticketService: TicketService,
        private flash: FlashMessagesService) {}

    ngOnInit() {

        const {
            projectId,
            sprintId,
        } = this.activeRoute.snapshot.params;

        this.ticketService.index(projectId, sprintId).subscribe(
            response => {
                console.log(response);

                this.tickets = response.data;
            },
            error => {
                console.log(error);

                if (error instanceof HttpErrorResponse) {
                    this.flash.show(error.error.message, { cssClass: 'alert alert-danger', timeout: 3000 });
                }
            }
        );

    }

}
