import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MATERIAL_COMPATIBILITY_MODE } from '@angular/material';
import 'hammerjs';

// import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';

import { MaterialModule } from './material.module';
import { APP_ROUTING } from './app.routing';
import { AppComponent } from './app.component';

import { ApiService } from './shared/api.service';
// import { SocketIOService } from './shared/socketio.service';
import { BusyLoaderComponent } from './shared/busy-loader/busy-loader.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './dashboard/shared/sidebar/sidebar.component';
import { FooterComponent } from './dashboard/shared/footer/footer.component';
import { TasksListComponent } from './dashboard/tasks/tasks-list/tasks-list.component';
import { ReportsListComponent } from './dashboard/reports/reports-list/reports-list.component';
import { MicrochipsListComponent } from './dashboard/microchips/microchips-list/microchips-list.component';
import { TaskViewComponent, DeleteTaskDialogComponent } from './dashboard/tasks/task-view/task-view.component';
import { MicrochipViewComponent, DeleteMicrochipDialogComponent } from './dashboard/microchips/microchip-view/microchip-view.component';
import { ReportViewComponent } from './dashboard/reports/report-view/report-view.component';
import { TaskCreatorComponent, AddConditionDialogComponent } from './dashboard/tasks/task-creator/task-creator.component';
import { MicrochipCreatorComponent } from './dashboard/microchips/microchip-creator/microchip-creator.component';
import { CardComponent } from './shared/card/card.component';

// const config: SocketIoConfig = { url: 'http://localhost:5000', options: {} };

@NgModule({
    imports: [
        BrowserModule,
        MaterialModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        // SocketIoModule.forRoot(config),
        APP_ROUTING
    ],
    declarations: [
        AppComponent,
        TaskCreatorComponent,
        AddConditionDialogComponent,
        DeleteTaskDialogComponent,
        DeleteMicrochipDialogComponent,
        BusyLoaderComponent,
        CardComponent,
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
        MicrochipCreatorComponent
    ],
    entryComponents: [
        AddConditionDialogComponent,
        DeleteTaskDialogComponent,
        DeleteMicrochipDialogComponent
    ],
    providers: [
        { provide: MATERIAL_COMPATIBILITY_MODE, useValue: true },
        ApiService,
        MaterialModule,
        // SocketIOService
    ],
    bootstrap: [AppComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
