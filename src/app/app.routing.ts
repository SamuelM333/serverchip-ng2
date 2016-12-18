import { ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { TasksComponent } from "./tasks/tasks.component";
import { ReportsComponent } from "./reports/reports.component";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { MicrochipsComponent } from "./microchips/microchips.component";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/tasks', pathMatch: 'full' },
    { path: 'tasks', component: TasksComponent },
    { path: 'reports', component: ReportsComponent },
    { path: 'microchips', component: MicrochipsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'sign-up', component: SignupComponent }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
