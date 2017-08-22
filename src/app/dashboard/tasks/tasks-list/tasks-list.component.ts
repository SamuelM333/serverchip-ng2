import { Component, ElementRef, ViewChild, OnInit, AfterViewInit } from '@angular/core';
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
import { Task } from '../../../shared/task';

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks-list.component.html'
})
export class TasksListComponent implements OnInit, AfterViewInit {
    @ViewChild('filter') filter: ElementRef;
    @ViewChild(MdPaginator) paginator: MdPaginator;
    displayedColumns = ['name', 'outputPort', 'microchip']; // TODO Add Owner
    exampleDatabase: ExampleDatabase;
    dataSource: TableDataSource | null;

    tasks: Task[] = [];
    pages: number[] = [];
    dataLength = 0;
    loading = true;
    task_to_delete: Task;

    constructor(private apiService: ApiService) { }

    ngOnInit() {

        this.loading = true;
        let error = false;
        let meta;
        this.apiService.getTasks().subscribe(
            data => {
                this.tasks = data._items;
                meta = data._meta;
                this.exampleDatabase = new ExampleDatabase(this.tasks);
                this.dataSource = new TableDataSource(this.exampleDatabase, this.paginator);
                this.dataLength = this.exampleDatabase.data.length;
                Observable.fromEvent(this.filter.nativeElement, 'keyup')
                    .debounceTime(150)
                    .distinctUntilChanged()
                    .subscribe(() => {
                            if (!this.dataSource) { return; }
                            this.dataSource.filter = this.filter.nativeElement.value;
                        }
                );
            },
            err => {
                error = true;
                console.log('Error:', err);
            },
            () => {
                let total = meta.total;
                let count = 0;
                while (total > 0) {
                    count += 1;
                    this.pages.push(count);
                    total -= meta.max_results;
                }

                this.loading = false;
            }
        );
    }

    ngAfterViewInit() {

    }

    deleteTask(task: Task) {
        this.apiService.deleteTask(task).subscribe(
            data => this.tasks.splice(this.tasks.indexOf(task), 1),
            error => console.log(error),
            () => {}
        );
    }
}

class ExampleDatabase {
    /** Stream that emits whenever the data has been modified. */
    dataChange: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
    get data(): Task[] { return this.dataChange.value; }
    constructor(private _tasks: Task[]) {
        // Fill up the database with 100 users.
        for (const task of this._tasks) {
            const copiedData = this.data.slice();
            copiedData.push(task);
            this.dataChange.next(copiedData);
        }
    }

    /** Builds and returns a new User. */
    // private createNewUser() {
    //     const name =
    //         NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
    //         NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';
    //
    //     return {
    //         id: (this.data.length + 1).toString(),
    //         name: name,
    //         progress: Math.round(Math.random() * 100).toString(),
    //         color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
    //     };
    // }
}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
class TableDataSource extends DataSource<any> {
    _filterChange = new BehaviorSubject('');
    get filter(): string { return this._filterChange.value; }
    set filter(filter: string) { this._filterChange.next(filter); }

    constructor(private _exampleDatabase: ExampleDatabase, private _paginator: MdPaginator) {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<Task[]> {
        const displayDataChanges = [
            this._exampleDatabase.dataChange,
            this._paginator.page,
            this._filterChange
        ];

        return Observable.merge(...displayDataChanges).map(() => {
            const data = this._exampleDatabase.data.slice();
            // Grab the page's slice of data.
            const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
            return this._exampleDatabase.data.slice().splice(startIndex, this._paginator.pageSize).filter((item: Task) => {
                const searchStr = (item.name).toLowerCase();
                return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
            });
        });
    }

    disconnect() {}
}


