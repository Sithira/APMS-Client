import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {SprintsService} from '../sprints.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
    selector: 'app-sprint',
    templateUrl: './sprint.component.html',
    styleUrls: ['./sprint.component.css']
})
export class SprintComponent implements OnInit {


    sprint = [];
    project = [];

    constructor(private http: HttpClient,
                private sprintService: SprintsService,
                private activeRoute: ActivatedRoute,
                private flash: FlashMessagesService,
                private router: Router) {
    }

    ngOnInit() {
        this.loadRelations();
    }

    loadRelations() {
        const {
            projectId,
            sprintId
        } = this.activeRoute.snapshot.params;

        // set the project id
        this.sprintService.projectId = projectId;

        // set the sprint id
        this.sprintService.sprintId = sprintId;

        this.sprintService.getProject().subscribe(results => {
            console.log(results);
            this.project = results.data;
        }, error => {
            console.log(error);
        });

        // call the service
        this.sprintService.show(sprintId, true).subscribe(response => {
            console.log(response);
            this.sprint = response.data;
        }, error => {
            console.log(error);
            if (error instanceof HttpErrorResponse) {
                this.flash.show(error.error.message, {cssClass: 'alert-danger alert', timeout: 5000});
            }

            // navigate the to the parent page, when an HTTP error occures
            this.router.navigate(['projects/' + projectId]);
        });
    }

}
