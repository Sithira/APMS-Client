import {Component, OnInit} from '@angular/core';
import {TicketService} from '../../services/ticket.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {SprintsService} from '../../services/sprints.service';

@Component({
    selector: 'app-ticket',
    templateUrl: './ticket.component.html',
    styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

    ticket: any;

    sprints = {};

    constructor(
        private activeRoute: ActivatedRoute,
        private ticketService: TicketService,
        private sprintService: SprintsService,
        private flash: FlashMessagesService,
        private router: Router) {
    }

    ngOnInit() {

        const {
            projectId,
            sprintId,
            ticketId
        } = this.activeRoute.snapshot.params;

        this.getSprints();

        this.ticketService.show(projectId, sprintId, ticketId, 'relation').subscribe(
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

    /**
     * Load the relationships of the project
     */
    loadRelations() {

        const {
            projectId,
            sprintId,
            ticketId
        } = this.activeRoute.snapshot.params;

        this.ticketService.show(projectId, sprintId, ticketId, null)
            .subscribe(response => {
                console.log(response);
                this.ticket = response.data;
            }, error => {
                console.log(error);

                this.flash.show(error.error.message, {cssClass: 'alert alert-danger', timeout: 5000});

                this.router.navigate(['/project/' + projectId]);
            });
    }

    /**
     * Get the Sprints (PLUCKED)
     */
    getSprints() {

        const {
            projectId,
        } = this.activeRoute.snapshot.params;

        this.sprintService.index(projectId, 'pluck').subscribe(response => {
            console.log(response);

            this.sprints = response.data;
        }, error => {
            console.log(error);
        });

    }

    save() {

        const {
            projectId,
            sprintId,
            ticketId
        } = this.activeRoute.snapshot.params;

        this.ticketService.update(projectId, sprintId, ticketId, this.ticket).subscribe(response => {

            console.log(response);

            if (Array.isArray(response)) {
                for (let i = 0; i < response.length; i++) {
                    this.flash.show(response[i].message, {cssClass: 'alert alert-danger', timeout: 3000});
                }

                return;
            }

            this.flash.show('Ticket updated successfully', {cssClass: 'alert alert-success', timeout: 3000});

        }, error => {

        });

    }

    /**
     * Update the given ticket
     *
     */
    update() {
        const {
            projectId,
            sprintId,
            ticketId
        } = this.activeRoute.snapshot.params;

        this.ticketService.update(projectId, sprintId, ticketId, this.ticket).subscribe(response => {

            console.log(response);

            this.flash.show('Ticket updated successfully', {cssClass: 'alert alert-success', timeout: 3000});

        }, error => {

            console.log(error);

            this.flash.show('Ticket failed to update', {cssClass: 'alert alert-danger', timeout: 3000});

        });
    }

}
