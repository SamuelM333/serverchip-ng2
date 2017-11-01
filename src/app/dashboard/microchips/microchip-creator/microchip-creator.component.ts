import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { ApiService } from '../../../shared/api.service';
import { User } from '../../../shared/user';


@Component({
    selector: 'app-microchip-creator',
    templateUrl: './microchip-creator.component.html',
})
export class MicrochipCreatorComponent implements OnInit {

    loading = false;
    user: User;

    constructor(private router: Router, private apiService: ApiService, private location: Location) {
        this.user = JSON.parse(localStorage.getItem('user'));
    }

    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem('authUser'));
    }

    back() {
        this.location.back();
    }
}
