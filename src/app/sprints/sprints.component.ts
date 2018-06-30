import {Component, OnInit} from '@angular/core';
import {SprintsService} from '../services/sprints.service';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
    selector: 'app-sprints',
    templateUrl: './sprints.component.html',
    styleUrls: ['./sprints.component.css']
})
export class SprintsComponent implements OnInit {
    project = [];

    sprints = [];
    constructor(
        private sprintService: SprintsService,
        private activatedRoute: ActivatedRoute,
        private flash: FlashMessagesService) {
    }

    ngOnInit() {

        const {
            projectId
        } = this.activatedRoute.snapshot.params;

        this.sprintService.getProject(projectId).subscribe(result => {
            console.log(result);
            this.project = result.data;
        }, error => {
            console.log(error);
            this.flash.show(error.error.message, { cssClass: 'alert alert-danger', timeout: 5000 });
        });

        this.sprintService.index(projectId, null).subscribe(
            results => {
                console.log(results);
                this.sprints = results.data;
            },
            error => {
                if (error instanceof HttpErrorResponse) {
                    this.flash.show(error.error.message, {cssClass: 'alert alert-danger', timeout: 5000});
                }
            }
        );
    }

}
