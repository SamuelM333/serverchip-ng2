import { Routes } from '@angular/router';

import { TasksComponent } from './tasks/tasks.component';
import { ReportsComponent } from './reports/reports.component';
import { MicrochipsComponent } from './microchips/microchips.component';

export const DASHBOARD_ROUTES: Routes = [
    { path: 'tasks', component: TasksComponent },
    { path: 'reports', component: ReportsComponent },
    { path: 'microchips', component: MicrochipsComponent },
];
