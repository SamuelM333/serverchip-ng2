import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from './material.module';
import { APP_ROUTING } from  './app.routing';
import { AppComponent } from './app.component';

import { ApiService } from './shared/api.service';
import { BusyLoaderComponent } from './shared/busy-loader/busy-loader.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './dashboard/shared/sidebar/sidebar.component';
import { FooterComponent } from './dashboard/shared/footer/footer.component';
import { TasksListComponent } from './dashboard/tasks/tasks-list/tasks-list.component';
import { ReportsListComponent } from './dashboard/reports/reports-list/reports-list.component';
import { MicrochipsListComponent } from './dashboard/microchips/microchips-list/microchips-list.component';
import { TaskViewComponent } from './dashboard/tasks/task-view/task-view.component';
import { MicrochipViewComponent } from './dashboard/microchips/microchip-view/microchip-view.component';
import { ReportViewComponent } from './dashboard/reports/report-view/report-view.component';
import { TaskCreatorComponent } from './dashboard/tasks/task-creator/task-creator.component';
import { MicrochipCreatorComponent } from './dashboard/microchips/microchip-creator/microchip-creator.component';

@NgModule({
    imports: [
        BrowserModule,
        MaterialModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        APP_ROUTING
    ],
    declarations: [
        AppComponent,
        BusyLoaderComponent,
        SidebarComponent,
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
        TaskCreatorComponent,
        MicrochipCreatorComponent,
    ],
    providers: [ApiService, MaterialModule],
    bootstrap: [AppComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
