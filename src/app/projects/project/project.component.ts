import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectsService} from '../../services/projects.service';
import {HttpErrorResponse} from '@angular/common/http';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

    project = [];

    relationsLoaded = false;

    authentic: AuthService;
    private projectId: any;
    private forceDestory: any;

    constructor(
        private auth: AuthService,
        private activatedRoute: ActivatedRoute,
        private projectsService: ProjectsService,
        private router: Router,
        private flash: FlashMessagesService) {

        this.authentic = auth;

        // get the id for the project
        const {
            projectId,
            forceDestory = 'false'
        } = this.activatedRoute.snapshot.params;

        this.projectId = projectId;

    }

    ngOnInit() {



        // call the API to get a single project instance instance
        this.projectsService.show(this.projectId, undefined).subscribe(
            response => {
                console.log(response);

                // todo: use momentJS later

                this.project = response.data;
            },
            error => {
                console.log(error);

                if (error.status === 401) {
                    this.router.navigate(['login']);
                }

                if (error instanceof HttpErrorResponse && error.status === 404) {
                    this.flash.show(error.error.message, {cssClass: 'alert alert-danger', timeout: 5000});
                    this.router.navigate(['/projects']);
                }

            }
        );
    }

    /**
     * Load the project with it's relations
     */
    loadRelations() {
        this.projectsService.show(this.projectId, 'relations').subscribe(
            response => {

                console.log(response);

                this.relationsLoaded = true;

                this.project = response.data;
            },
            error => {
                console.log(error);

                if (error instanceof HttpErrorResponse) {
                    this.flash.show('Couldn\'t load more information about this project.', {cssClass: 'alert alert-danger', timeout: 5000});
                }

            }
        );
    }

    pluckRelations() {
        this.projectsService.show(this.projectId, 'pluck').subscribe(
            response => {

                console.log(response);

                this.relationsLoaded = true;

                this.project = response.data;
            },
            error => {
                console.log(error);

                if (error instanceof HttpErrorResponse) {
                    this.flash.show('Couldn\'t load plucks of the project.', {cssClass: 'alert alert-danger', timeout: 5000});
                }

            }
        );
    }

    update() {
        this.projectsService.update(this.projectId, this.project).subscribe(response => {
            console.log(response);

            if (Array.isArray(response)) {
                for (let i = 0; i < response.length; i++) {
                    this.flash.show(response[i].message, {cssClass: 'alert alert-danger', timeout: 5000});
                }
                return;
            }

            this.flash.show('Project updated successfully', {cssClass: 'alert alert-success', timeout: 5000});
        }, error => {
            if (error instanceof HttpErrorResponse) {
                this.flash.show(error.error.message, {cssClass: 'alert alert-danger', timeout: 3000});
            }
        });
    }

    delete() {
        this.projectsService.destroy(this.projectId, this.forceDestory).subscribe(response => {

            console.log(response);

            this.flash.show('Project removed successfully');

            this.router.navigate(['projects']);

        }, error => {
            this.flash.show(error.error.message);
        });
    }
}
