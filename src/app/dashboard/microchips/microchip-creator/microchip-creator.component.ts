import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from '../../../shared/api.service';
import { User } from '../../../shared/user';
import { Microchip } from '../../../shared/microchip';


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
        console.log(this.user);
    }

    back() {
        this.location.back();
    }

    onSubmit(form: NgForm) {
        this.loading = true;
        const microchip = new Microchip(
            form.value.name,
            this.user,
            form.value.ip
        );
        microchip.description = form.value.description ? form.value.description : '';

        this.apiService.insertMicrochip(microchip).subscribe(
            data => this.router.navigateByUrl('/dashboard/microchips/' + data._id),
            error => console.log('Error', error),
            () => this.loading = false
        );
    }

}
