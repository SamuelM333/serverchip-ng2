import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../../../shared/api.service';


@Component({
    selector: 'app-task-creator',
    templateUrl: './task-creator.component.html'
})
export class TaskCreatorComponent implements OnInit {

    loading: boolean;

    constructor(private router: Router,
                private apiService: ApiService) { }

    ngOnInit() {
        this.loading = true;
    }
}
