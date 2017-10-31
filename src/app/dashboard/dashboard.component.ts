import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../shared/user';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent {
    isDarkTheme = true;
    user: User;

    constructor(private router: Router) {
        this.user = JSON.parse(localStorage.getItem('authUser'));
        if (!this.user) {
            this.router.navigateByUrl('/login');
        }
    }

    logout() {
        localStorage.removeItem('authUser');
        this.router.navigateByUrl('/login');
    }
}
