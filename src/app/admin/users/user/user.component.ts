import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {ActivatedRoute} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {TeamService} from '../../../services/team.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

    user: any;

    teams: any;

    constructor(private userService: UserService,
                private teamService: TeamService,
                private activeRoute: ActivatedRoute,
                private flash: FlashMessagesService) {
    }

    ngOnInit() {

        const {
            userId
        } = this.activeRoute.snapshot.params;

        this.teamService.pluck().subscribe(response => {

            this.teams = response.data;

        }, error => {

        });

        this.userService.show(userId).subscribe(response => {

            console.log(response);

            this.user = response.data;

        }, error => {

            console.log(error);

            this.flash.show(error.error, { cssClass: 'alert alert-danger', timeout: 3000 });

        });

    }

    /**
     * Update the user
     */
    save() {

        const {
            userId
        } = this.activeRoute.snapshot.params;

        this.userService.save(userId, this.user).subscribe(response => {

            console.log(response);

            if (Array.isArray(response)) {
                for (let i = 0; i < response.length; i++) {
                    this.flash.show(response[i].message, { cssClass: 'alert alert-danger', timeout: 3000 });
                }

                return;
            }

            this.flash.show('Use updated successfully', { cssClass: 'alert alert-success', timeout: 3000 });

        }, error => {

            console.log(error);

            this.flash.show('Use update failed', { cssClass: 'alert alert-danger', timeout: 3000 });

        });
    }

}
