import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MATERIAL_COMPATIBILITY_MODE } from '@angular/material';
import 'hammerjs';

import { MaterialModule } from './material.module';
import { APP_ROUTING } from './app.routing';
import { AppComponent } from './app.component';

import { ApiService } from './shared/api.service';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TasksListComponent } from './dashboard/tasks/tasks-list/tasks-list.component';
import { TaskViewComponent, DeleteTaskDialogComponent } from './dashboard/tasks/task-view/task-view.component';
import { TaskFormComponent, AddConditionDialogComponent } from './dashboard/tasks/task-form/task-form.component';
import { TaskEditorComponent } from './dashboard/tasks/task-editor/task-editor.component';
import { TaskCreatorComponent } from './dashboard/tasks/task-creator/task-creator.component';
import { ReportsListComponent } from './dashboard/reports/reports-list/reports-list.component';
import { MicrochipsListComponent } from './dashboard/microchips/microchips-list/microchips-list.component';
import { MicrochipViewComponent, DeleteMicrochipDialogComponent } from './dashboard/microchips/microchip-view/microchip-view.component';
import { ReportViewComponent } from './dashboard/reports/report-view/report-view.component';
import { MicrochipCreatorComponent } from './dashboard/microchips/microchip-creator/microchip-creator.component';
import { MicrochipEditorComponent } from './dashboard/microchips/microchip-editor/microchip-editor.component';
import { MicrochipFormComponent } from './dashboard/microchips/microchip-form/microchip-form.component';
import { CardComponent } from './shared/card/card.component';

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
        TaskCreatorComponent,
        TaskEditorComponent,
        TaskFormComponent,
        TasksListComponent,
        AddConditionDialogComponent,
        DeleteTaskDialogComponent,
        DeleteMicrochipDialogComponent,
        CardComponent,
        LoginComponent,
        SignupComponent,
        DashboardComponent,
        TaskViewComponent,
        MicrochipsListComponent,
        MicrochipViewComponent,
        MicrochipFormComponent,
        MicrochipEditorComponent,
        ReportsListComponent,
        ReportViewComponent,
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
        MaterialModule
    ],
    bootstrap: [AppComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
