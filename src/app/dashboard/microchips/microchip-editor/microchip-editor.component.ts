import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from '../../../shared/api.service';
import { User } from '../../../shared/user';
import { Microchip } from '../../../shared/microchip';


@Component({
    selector: 'app-microchip-editor',
    templateUrl: './microchip-editor.component.html',
    styles: [`
        .form-field {
            width: 500px;
            margin-left: 0;
        }
    `]
})
export class MicrochipEditorComponent implements OnInit {

    loading = false;
    user: User;
    microchip: Microchip;
    _id: string;

    constructor(private apiService: ApiService,
                // private socketIOService: SocketIOService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private location: Location) {
        this._id = activatedRoute.snapshot.params['id'];
        this.user = JSON.parse(localStorage.getItem('user'));

    }

    ngOnInit() {
        this.apiService.getUser('58892f662589503db4700db3').subscribe(
            (data) => this.user = data
        );

        this.apiService.getMicrochipByID(this._id).subscribe(
            data => {
                this.microchip = data;
            },
            err => console.log('Error:', err),
            () => { this.loading = false; }
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
