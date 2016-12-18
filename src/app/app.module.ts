import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { APP_ROUTING } from "./app.routing";

import { AppComponent } from './app.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { TasksComponent } from './tasks/tasks.component';
import { ReportsComponent } from './reports/reports.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { MicrochipsComponent } from './microchips/microchips.component';

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
        MicrochipsComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
