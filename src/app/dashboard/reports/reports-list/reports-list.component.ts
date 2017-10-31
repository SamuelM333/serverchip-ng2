import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { MatPaginator } from '@angular/material';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import * as moment from 'moment-timezone';

import { ApiService } from '../../../shared/api.service';
import { Report } from '../../../shared/report';

@Component({
    selector: 'app-reports',
    templateUrl: './reports-list.component.html',
})
export class ReportsListComponent implements OnInit {
    @ViewChild('filter') filter: ElementRef;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    displayedColumns = ['Task name', 'Microchip', 'Date', 'Code']; // TODO Add Owner and date added
    database: ReportsData;
    dataSource: ReportTableDataSource | null;
    dataLength = 0;

    reports: Report[];
    loading: boolean;

    constructor(private apiService: ApiService) { }

    ngOnInit() {
        this.loading = true;
        let error = false;
        this.apiService.getReports().subscribe(
            data => {
                this.reports = data._items;
                this.reports.forEach(report => {
                    const date = moment(report.created);
                    report.created = date.format('MMM DD/YY, HH:mm A');
                });

                this.database = new ReportsData(this.reports);
                this.dataSource = new ReportTableDataSource(this.database, this.paginator);
                this.dataLength = this.database.data.length;
                Observable.fromEvent(this.filter.nativeElement, 'keyup')
                    .debounceTime(150)
                    .distinctUntilChanged()
                    .subscribe(() => {
                            if (!this.dataSource) { return; }
                            this.dataSource.filter = this.filter.nativeElement.value;
                        }
                    );
            },
            e => {
                error = true;
                console.log('Error:', e);
            },
            () => this.loading = false
        );
    }

}

class ReportsData {
    /** Stream that emits whenever the data has been modified. */
    dataChange: BehaviorSubject<Report[]> = new BehaviorSubject<Report[]>([]);

    get data(): Report[] { return this.dataChange.value; }

    constructor(private _microchips: Report[]) {
        for (const task of this._microchips) {
            const copiedData = this.data.slice();
            copiedData.push(task);
            this.dataChange.next(copiedData);
        }
    }
}

class ReportTableDataSource extends DataSource<any> {
    get filter(): string { return this._filterChange.value; }

    set filter(filter: string) { this._filterChange.next(filter); }

    private _filterChange = new BehaviorSubject('');

    constructor(private _microchipsData: ReportsData, private _paginator: MatPaginator) {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<Report[]> {
        const displayDataChanges = [
            this._microchipsData.dataChange,
            this._paginator.page,
            this._filterChange
        ];

        return Observable.merge(...displayDataChanges).map(() => {
            // Grab the page's slice of data.
            const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
            return this._microchipsData.data.slice().splice(startIndex, this._paginator.pageSize).filter((item: Report) => {
                const searchStr = (item.details.task.name + item.microchip.name + item.created + item.details.status.code).toLowerCase();
                return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
            });
        });
    }

    disconnect() {}
}
