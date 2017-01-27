import { Component, OnInit } from '@angular/core';
import { Microchip } from "../../../shared/microchip";
import { ApiService } from "../../../shared/api.service";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-microchip-view',
    templateUrl: './microchip-view.component.html',
    styleUrls: ['./microchip-view.component.sass']
})
export class MicrochipViewComponent implements OnInit {

    _id: string;
    microchip: Microchip;

    constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute) {
        this._id = activatedRoute.snapshot.params['id'];
    }

    ngOnInit() {
        this.apiService.getMicrochipByID(this._id).subscribe(
            data => {
                this.microchip = data;
                // this.microchip.owner = data.owner.name;
            },
            err => console.log("Error:", err),
            () => {}
        );
    }

}
