import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { APP_ROUTING } from  './app.routing';

import { AppComponent } from './app.component';

import { ApiService } from './shared/api.service';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './dashboard/shared/sidebar/sidebar.component';
import { HeaderComponent } from './dashboard/shared/header/header.component';
import { FooterComponent } from './dashboard/shared/footer/footer.component';
import { TasksListComponent } from './dashboard/tasks/tasks-list/tasks-list.component';
import { ReportsListComponent } from './dashboard/reports/reports-list/reports-list.component';
import { MicrochipsListComponent } from './dashboard/microchips/microchips-list/microchips-list.component';
import { TaskViewComponent } from './dashboard/tasks/task-view/task-view.component';
import { MicrochipViewComponent } from './dashboard/microchips/microchip-view/microchip-view.component';
import { ReportViewComponent } from './dashboard/reports/report-view/report-view.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        APP_ROUTING
    ],
    declarations: [
        AppComponent,
        SidebarComponent,
        HeaderComponent,
        FooterComponent,
        LoginComponent,
        SignupComponent,
        DashboardComponent,
        TasksListComponent,
        TaskViewComponent,
        MicrochipsListComponent,
        MicrochipViewComponent,
        ReportsListComponent,
        ReportViewComponent,
    ],
    providers: [ApiService],
    bootstrap: [AppComponent]
})
export class AppModule { }
