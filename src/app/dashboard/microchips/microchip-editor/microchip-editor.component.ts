import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
                private ref: ChangeDetectorRef,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private location: Location) {
        this._id = activatedRoute.snapshot.params['id'];
    }

    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem('authUser'));
        this.apiService.getMicrochipByID(this._id).subscribe(
            data => {
                this.microchip = data;
                this.ref.markForCheck();
            },
            err => console.log('Error:', err),
            () => { this.loading = false; }
        );
    }

    back() {
        this.location.back();
    }
}
