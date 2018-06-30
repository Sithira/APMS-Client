import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {AppRoutingModule} from './app-routing.module';
import {ProjectsComponent} from './projects/projects.component';
import {LoginComponent} from './auth/login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './guards/auth.guard';
import {TokenInterceptorService} from './services/token-interceptor.service';
import {ProjectComponent} from './projects/project/project.component';
import {SprintsComponent} from './sprints/sprints.component';
import {ErrorPageComponent} from './error-page/error-page.component';
import {SprintComponent} from './sprints/sprint/sprint.component';
import {FlashMessagesModule} from 'angular2-flash-messages';
import { TicketsComponent } from './tickets/tickets.component';
import { TicketComponent } from './tickets/ticket/ticket.component';
import {DataTablesModule} from 'angular-datatables';
import { UsersComponent } from './admin/users/users.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './admin/users/user/user.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        ProjectsComponent,
        LoginComponent,
        DashboardComponent,
        ProjectComponent,
        SprintsComponent,
        ErrorPageComponent,
        SprintComponent,
        TicketsComponent,
        TicketComponent,
        UsersComponent,
        AdminComponent,
        UserComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        FlashMessagesModule.forRoot(),
        DataTablesModule,
    ],
    providers: [
        AuthService,
        AuthGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
