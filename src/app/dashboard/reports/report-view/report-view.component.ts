import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';

import * as moment from 'moment-timezone';


import { Report } from '../../../shared/report';
import { ApiService } from '../../../shared/api.service';

@Component({
    selector: 'app-report-view',
    templateUrl: './report-view.component.html',
    styles: ['.sub-container { margin-left: 32px; }']
})
export class ReportViewComponent implements OnInit {

    _id: string;
    report: Report;
    loading: boolean;

    constructor(private dialog: MatDialog,
                private apiService: ApiService,
                // private socketIOService: SocketIOService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private location: Location) {
        this._id = activatedRoute.snapshot.params['id'];
    }

    ngOnInit() {
        this.loading = true;
        this.apiService.getReportByID(this._id).subscribe(
            (report) => {
                this.report = report;
                const date = moment(report.created);
                this.report.created = date.format('MMM DD/YY, HH:mm A');
            },
            (err) => console.log(err),
            () => this.loading = false
        );
    }

    back() {
        this.location.back();
    }
}


