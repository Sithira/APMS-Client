import {Component, OnInit} from '@angular/core';
import {TicketService} from '../ticket.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'app-ticket',
    templateUrl: './ticket.component.html',
    styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

    ticket = [];

    constructor(
        private activeRoute: ActivatedRoute,
        private ticketService: TicketService,
        private flash: FlashMessagesService,
        private router: Router) {
    }

    ngOnInit() {

        const {
            projectId,
            sprintId,
            ticketId
        } = this.activeRoute.snapshot.params;

        this.ticketService.projectId = projectId;

        this.ticketService.sprintId = sprintId;

        this.ticketService.show(ticketId, undefined).subscribe(
            response => {
                console.log(response);

                this.ticket = response.data;
            },
            error => {
                console.log(error);

                if (error instanceof HttpErrorResponse) {
                    this.flash.show(error.error.message, {cssClass: 'alert alert-danger', timeout: 5000});

                    this.router.navigate(['/projects/' + projectId]);
                }
            }
        );
    }

    loadRelations() {

        const {
            projectId,
            // sprintId,
            ticketId
        } = this.activeRoute.snapshot.params;

        this.ticketService.show(ticketId, true)
            .subscribe(response => {
                console.log(response);
                this.ticket = response.data;
            }, error => {
                console.log(error);

                this.flash.show(error.error.message, {cssClass: 'alert alert-danger', timeout: 5000});

                this.router.navigate(['/project/' + projectId]);
            });
    }

}
