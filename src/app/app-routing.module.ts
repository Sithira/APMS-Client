import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ProjectsComponent} from './projects/projects.component';
import {LoginComponent} from './auth/login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuard} from './guards/auth.guard';
import {ProjectComponent} from './projects/project/project.component';
import {ErrorPageComponent} from './error-page/error-page.component';
import {SprintComponent} from './sprints/sprint/sprint.component';
import {TicketComponent} from './tickets/ticket/ticket.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'projects',
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: ProjectsComponent
            },
            {
                path: ':projectId',
                component: ProjectComponent
            },
            {
                path: ':projectId/sprints/:sprintId',
                component: SprintComponent
            },
            {
                path: ':projectId/sprints/:sprintId/tickets/:ticketId',
                component: TicketComponent
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '404',
        component: ErrorPageComponent, data: {message: 'Page not found'}
    },
    {
        path: '**',
        redirectTo: '404'
    }
];


@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes)],
})

export class AppRoutingModule {
}
