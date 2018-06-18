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

    constructor(private http: HttpClient,
                private sprintService: SprintsService,
                private activeRoute: ActivatedRoute,
                private flash: FlashMessagesService,
                private router: Router) {
    }

    ngOnInit() {

        const {
            projectId,
            sprintId
        } = this.activeRoute.snapshot.params;

        this.sprintService.projectId = projectId;

        this.sprintService.sprintId = sprintId;

        this.sprintService.show(sprintId, undefined).subscribe(response => {
                console.log(response);
                this.sprint = response.data;
            }, error => {
                console.log(error);

                if (error instanceof HttpErrorResponse) {
                    this.flash.show(error.error.message, {cssClass: 'alert-danger alert', timeout: 5000});
                }
            }
        );
    }

    loadRelations() {
        const {
            projectId,
            sprintId
        } = this.activeRoute.snapshot.params;

        this.sprintService.projectId = projectId;

        this.sprintService.sprintId = sprintId;

        this.sprintService.show(sprintId, true).subscribe(response => {
            console.log(response);
            this.sprint = response.data;
        }, error => {
            console.log(error);
            this.flash.show(error.error.message, {cssClass: 'alert-danger alert', timeout: 5000});
            this.router.navigate(['/projects/' + projectId ]);
        });
    }

}
