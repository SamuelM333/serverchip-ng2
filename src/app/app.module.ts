import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { APP_ROUTING } from  './app.routing';

import { AppComponent } from './app.component';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './dashboard/shared/sidebar/sidebar.component';
import { HeaderComponent } from './dashboard/shared/header/header.component';
import { FooterComponent } from './dashboard/shared/footer/footer.component';
import { TasksComponent } from './dashboard/tasks/tasks.component';
import { ReportsComponent } from './dashboard/reports/reports.component';
import { MicrochipsComponent } from './dashboard/microchips/microchips.component';

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
        TasksComponent,
        ReportsComponent,
        LoginComponent,
        SignupComponent,
        MicrochipsComponent,
        DashboardComponent,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
