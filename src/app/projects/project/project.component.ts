import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectsService} from '../projects.service';
import {HttpErrorResponse} from '@angular/common/http';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

    projectId;

    project = [];

    relationsLoaded = false;

    constructor(
        private activatedRoute: ActivatedRoute,
        private projectsService: ProjectsService,
        private router: Router,
        private flash: FlashMessagesService) {}

    ngOnInit() {

        // get the id for the project
        this.projectId = this.activatedRoute.snapshot.params['projectId'];

        // call the API to get a single project instance instance
        this.projectsService.show(this.projectId, undefined).subscribe(
            response => {
                console.log(response);

                this.project = response.data;
            },
            error => {
                console.log(error);

                if (error instanceof HttpErrorResponse && error.status === 404) {
                    this.flash.show(error.error.message, { cssClass: 'alert alert-danger', timeout: 5000 });
                    this.router.navigate(['/projects']);
                }

            }
        );
    }

    loadRelations() {
        this.projectsService.show(this.projectId, true).subscribe(
            response => {

                console.log(response);

                this.relationsLoaded = true;

                this.project = response.data;
            },
            error => {
                console.log(error);

                if (error instanceof HttpErrorResponse) {
                    this.flash.show('Couldnt load more information about this project.', { cssClass: 'alert alert-danger', timeout: 5000 });
                }

            }
        );
    }
}
