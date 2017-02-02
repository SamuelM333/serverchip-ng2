import { Routes } from '@angular/router';

import { TasksListComponent } from './tasks/tasks-list/tasks-list.component';
import { TaskViewComponent } from './tasks/task-view/task-view.component';
import { TaskCreatorComponent } from './tasks/task-creator/task-creator.component';
import { ReportsListComponent } from './reports/reports-list/reports-list.component';
import { ReportViewComponent } from './reports/report-view/report-view.component';
import { MicrochipsListComponent } from './microchips/microchips-list/microchips-list.component';
import { MicrochipViewComponent } from './microchips/microchip-view/microchip-view.component';
import { MicrochipCreatorComponent } from './microchips/microchip-creator/microchip-creator.component';

export const DASHBOARD_ROUTES: Routes = [
    { path: 'tasks', component: TasksListComponent },
    { path: 'tasks/new', component: TaskCreatorComponent },
    { path: 'tasks/edit/:id', component: TaskCreatorComponent },
    { path: 'tasks/:id', component: TaskViewComponent },
    { path: 'reports', component: ReportsListComponent },
    { path: 'reports/:id', component: ReportViewComponent },
    { path: 'microchips', component: MicrochipsListComponent },
    { path: 'microchips/new', component: MicrochipCreatorComponent },
    { path: 'microchips/edit/:id', component: MicrochipCreatorComponent },
    { path: 'microchips/:id', component: MicrochipViewComponent },
];
