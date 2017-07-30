import { Routes, RouterModule } from  '@angular/router';

import { DASHBOARD_ROUTES } from './dashboard/dashboard.routes';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';


const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/dashboard/tasks', pathMatch: 'full' },
    { path: 'dashboard', redirectTo: '/dashboard/tasks', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent, children: DASHBOARD_ROUTES },
    { path: 'login', component: LoginComponent },
    { path: 'sign-up', component: SignupComponent }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
