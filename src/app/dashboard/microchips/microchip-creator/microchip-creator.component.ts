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
    styles: [`
        .form-field {
            width: 500px;
            margin-left: 0;
        }
    `]
})
export class MicrochipCreatorComponent implements OnInit {

    loading = false;
    user: User;

    constructor(private router: Router, private apiService: ApiService, private location: Location) {
        this.user = JSON.parse(localStorage.getItem('user'));
    }

    ngOnInit() {
        this.apiService.getUser('58892f662589503db4700db3').subscribe(
            (data) => this.user = data
        );
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
