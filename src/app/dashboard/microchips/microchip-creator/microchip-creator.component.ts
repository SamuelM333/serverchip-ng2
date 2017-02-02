import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { ApiService } from "../../../shared/api.service";
import { User } from "../../../shared/user";
import { Microchip } from "../../../shared/microchip";


@Component({
    selector: 'app-microchip-creator',
    templateUrl: './microchip-creator.component.html',
    styleUrls: ['./microchip-creator.component.sass']
})
export class MicrochipCreatorComponent implements OnInit {

    loading: boolean = false;
    user: User;

    constructor(private router: Router, private apiService: ApiService) {
        this.user = JSON.parse(localStorage.getItem('user'));
    }

    ngOnInit() { }

    onSubmit(form: NgForm) {
        this.loading = true;
        let microchip = new Microchip(
            form.value.name,
            // this.user._id,
            "58892f662589503db4700db3",
            form.value.ip)
        form.value.description ? microchip.description = form.value.description : {};

        this.apiService.insertMicrochip(microchip).subscribe(
            data => this.router.navigateByUrl('/dashboard/microchips/' + data._id),
            error => console.log("Error", error),
            () => this.loading = false
        );
    }

}
