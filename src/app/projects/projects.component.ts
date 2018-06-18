import {Component, OnInit} from '@angular/core';
import {ProjectsService} from './projects.service';
import {HttpErrorResponse} from '@angular/common/http';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AuthService} from '../services/auth.service';
import * as moment from 'moment';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

    projects = [];

    project = {
        created_at: moment.now(),
        updated_at: moment.now(),
        _manager_id: '5b2639198f03181657bac1bf',
        _client_id: '5b2639198f03181657bac1bf',
        _team_id: '5b2639198f03181657bac1ce'
    };

    authentic: AuthService;

    constructor(
        private projectsService: ProjectsService,
        private flash: FlashMessagesService,
        private auth: AuthService) {
        this.authentic = auth;
    }

    ngOnInit() {
        this.projectsService.index().subscribe(response => {
                console.log(response);
                this.projects = response.data;
            }, error => {
                console.log(error);
                if (error instanceof HttpErrorResponse && error.status === 401) {
                    this.flash.show(error.error.message, {cssClass: 'alert alert-danger', timeout: 3000});
                    this.flash.grayOut(true);
                }
            }
        );
    }

    canCreateNewResources() {
        if (this.authentic.isAdmin()) {
            return true;
        } else {
            if (this.authentic.isManager()) {
                return true;
            }
        }

        return false;
    }

    create() {

        console.log(this.project);

        this.projectsService.create(this.project).subscribe(response => {

            console.log(response);

            if (Array.isArray(response)) {
                console.log(response);
                for (let i = 0; i < response.length; i++) {
                    this.flash.show(response[i].message, {cssClass: 'alert alert-danger', timeout: 5000});
                }

                return;
            }

            this.flash.show('project created successfully', {cssClass: 'alert alert-success', timeout: 5000});

        }, error => {
            console.log(error);
        });
    }

    destroy() {

    }

}
