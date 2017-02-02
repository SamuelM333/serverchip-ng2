import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { Task } from "../../../shared/task";
import { Microchip } from "../../../shared/microchip";
import { ApiService } from "../../../shared/api.service";

@Component({
    selector: 'app-microchip-view',
    templateUrl: './microchip-view.component.html',
    styleUrls: ['./microchip-view.component.sass']
})
export class MicrochipViewComponent implements OnInit {

    _id: string;
    microchip: Microchip;
    tasks: Task[] = [];
    loading: boolean;

    constructor(private apiService: ApiService, private router: Router, private activatedRoute: ActivatedRoute) {
        this._id = activatedRoute.snapshot.params['id'];
    }

    ngOnInit() {
        this.loading = true;
        this.apiService.getMicrochipByID(this._id).subscribe(
            data => {
                this.microchip = data;
                this.apiService.getTaskByMicrochipID(this.microchip._id).subscribe(
                    data => this.tasks = data._items
                );
            },
            err => console.log("Error:", err),
            () => { this.loading = false;}
        );
    }

    deleteMicrochip() {
        this.apiService.deleteMicrochip(this.microchip).subscribe(
            data => this.router.navigateByUrl('/dashboard/microchips'),
            error => console.log(error),
            () => {}
        );
    }

}
