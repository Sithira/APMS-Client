import {Component, OnInit} from '@angular/core';
import {ProjectsService} from './projects.service';
import {HttpErrorResponse} from '@angular/common/http';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

    projects = [];

    constructor(
        private projectsService: ProjectsService,
        private flash: FlashMessagesService) {}

    ngOnInit() {
        this.projectsService.index().subscribe(response => {
                console.log(response);
                this.projects = response.data;
            }, error => {
                console.log(error);
                if (error instanceof HttpErrorResponse && error.status === 401) {
                    this.flash.show(error.error.message, { cssClass: 'alert alert-danger', timeout: 3000 });
                    this.flash.grayOut(true);
                }
            }
        );
    }

}
