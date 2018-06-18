import {Component, OnInit} from '@angular/core';
import {SprintsService} from './sprints.service';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
    selector: 'app-sprints',
    templateUrl: './sprints.component.html',
    styleUrls: ['./sprints.component.css']
})
export class SprintsComponent implements OnInit {

    sprints = [];

    constructor(
        private sprintService: SprintsService,
        private activatedRoute: ActivatedRoute,
        private flash: FlashMessagesService) {
    }

    ngOnInit() {
        this.sprintService.projectId = this.activatedRoute.snapshot.params['projectId'];

        this.sprintService.index().subscribe(
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
