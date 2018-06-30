import {Component, OnInit} from '@angular/core';
import {ProjectsService} from '../services/projects.service';
import {HttpErrorResponse} from '@angular/common/http';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AuthService} from '../services/auth.service';
import * as moment from 'moment';
import {TeamService} from '../services/team.service';
import {UserService} from '../services/user.service';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

    tableView = false;

    projects = [];
    managers = [];
    teams = [];
    clients = [];

    project = {
        created_at: moment.now(),
        updated_at: moment.now(),
    };
    authentic: AuthService;

    constructor(
        private userService: UserService,
        private projectsService: ProjectsService,
        private teamService: TeamService,
        private flash: FlashMessagesService,
        private auth: AuthService) {
        this.authentic = auth;
        this.tableView = false;
    }

    ngOnInit() {

        this.projectsService.index(null).subscribe(response => {
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

        // get the details from the teams node
        this.teamService.pluck().subscribe(response => {

            console.log(response);

            this.teams = response.data;

        }, error => {

            console.log(error);
            this.flash.show(error.error, {timeout: 3000, cssClass: 'alert alert-danger'});

        });

        // get the managers of the system
        this.userService.getType('manager').subscribe(response => {

            console.log(response);

            this.managers = response.data;

        }, error => {
            console.log(error);
        });

        // get the clients for the project
        this.userService.getType('client').subscribe(response => {

            console.log(response);

            this.clients = response.data;

        }, error => {
            console.log(error);
        });
    }

    /**
     * Make the switch between the table and card views
     *
     * @param state
     */
    switchView(state) {
        this.tableView = state;
    }

    /**
     * Determine if the create resource should be visible or not
     *
     * @return {boolean}
     */
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

    /**
     * Create a new project in the database
     */
    create() {

        console.log(this.project);

        this.projectsService.create(this.project).subscribe(response => {

            console.log(response);

            if (Array.isArray(response)) {
                console.log(response);
                for (let i = 0; i < response.length; i++) {
                    this.flash.show(response[i].message, {cssClass: 'alert alert-danger', timeout: 3000});
                }

                return;
            }

            this.projects.push(response.data);

            this.flash.show('project created successfully', {cssClass: 'alert alert-success', timeout: 3000});

            // const t = setTimeout(() => {
            //     $('#projectModel').modal('hide');
            //     clearTimeout(t);
            // }, 3000);

        }, error => {
            console.log(error);
            this.flash.show('project creation failed', {cssClass: 'alert alert-danger', timeout: 3000});
        });
    }

    /**
     * Get the team list for the project creation
     */
    getTeam() {
        this.teamService.pluck().subscribe(response => {

            console.log(response);

            this.teams = response.data;

        }, error => {
            console.log(error);

            this.flash.show('Couldnt get the teams details', {cssClass: 'alert alert-danger', timeout: 3000});
        });
    }

    getManagers() {
        // Todo: Implement the user service
    }

    getClients() {
        // Todo: above
    }

}
