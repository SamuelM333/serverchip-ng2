import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk';
import { MdPaginator } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

import { ApiService } from '../../../shared/api.service';
import { Microchip } from '../../../shared/microchip';

@Component({
    selector: 'app-microchips',
    templateUrl: './microchips-list.component.html'
})
export class MicrochipsListComponent implements OnInit {
    @ViewChild('filter') filter: ElementRef;
    @ViewChild(MdPaginator) paginator: MdPaginator;
    displayedColumns = ['name', 'tasks', 'ip']; // TODO Add Owner and date added
    database: MicrochipsData;
    dataSource: MicrochipTableDataSource | null;
    dataLength = 0;

    microchips: Microchip[];
    loading: boolean;
    microchip_to_delete: Microchip;

    constructor(private apiService: ApiService) { }

    ngOnInit() {
        this.loading = true;
        let error = false;
        this.apiService.getMicrochips().subscribe(
            data => {
                this.microchips = data._items;
                for (let i = 0; i < this.microchips.length; i++) {
                    this.apiService.getTaskByMicrochipID(this.microchips[i]._id).subscribe(
                        taskData => this.microchips[i].tasks = taskData._meta.total
                    );
                }

                this.database = new MicrochipsData(this.microchips);
                this.dataSource = new MicrochipTableDataSource(this.database, this.paginator);
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

    onClickDeleteMicrochip(index: number) {
        this.microchip_to_delete = this.microchips[index];
    }

    deleteMicrochip(microchip: Microchip) {
        this.apiService.deleteMicrochip(microchip).subscribe(
            data => this.microchips.splice(this.microchips.indexOf(microchip), 1),
            error => console.log(error)
        );
    }
}


class MicrochipsData {
    /** Stream that emits whenever the data has been modified. */
    dataChange: BehaviorSubject<Microchip[]> = new BehaviorSubject<Microchip[]>([]);
    get data(): Microchip[] { return this.dataChange.value; }
    constructor(private _microchips: Microchip[]) {
        for (const task of this._microchips) {
            const copiedData = this.data.slice();
            copiedData.push(task);
            this.dataChange.next(copiedData);
        }
    }
}

class MicrochipTableDataSource extends DataSource<any> {
    get filter(): string { return this._filterChange.value; }
    set filter(filter: string) { this._filterChange.next(filter); }
    private _filterChange = new BehaviorSubject('');

    constructor(private _microchipsData: MicrochipsData, private _paginator: MdPaginator) {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<Microchip[]> {
        const displayDataChanges = [
            this._microchipsData.dataChange,
            this._paginator.page,
            this._filterChange
        ];

        return Observable.merge(...displayDataChanges).map(() => {
            // Grab the page's slice of data.
            const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
            return this._microchipsData.data.slice().splice(startIndex, this._paginator.pageSize).filter((item: Microchip) => {
                const searchStr = (item.name + item.ip).toLowerCase();
                return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
            });
        });
    }

    disconnect() {}
}
