import { ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { TasksComponent } from "./tasks/tasks.component";
import { ReportsComponent } from "./reports/reports.component";

const APP_ROUTES: Routes = [
    { path: '', component: TasksComponent },
    { path: 'reports', component: ReportsComponent },
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
