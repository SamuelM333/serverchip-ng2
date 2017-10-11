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

import { ApiService } from '../../../shared/api.service';
import { Task } from '../../../shared/task';

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks-list.component.html'
})
export class TasksListComponent implements OnInit {
    @ViewChild('filter') filter: ElementRef;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    displayedColumns = ['name', 'outputPort', 'microchip']; // TODO Add Owner and active tasks
    database: TaskData;
    dataSource: TaskTableDataSource | null;

    tasks: Task[] = [];
    dataLength = 0;
    loading = true;
    task_to_delete: Task;

    constructor(private apiService: ApiService) { }

    ngOnInit() {
        this.loading = true;
        let error = false;
        this.apiService.getTasks().subscribe(
            data => {
                this.tasks = data._items;
                this.database = new TaskData(this.tasks);
                this.dataSource = new TaskTableDataSource(this.database, this.paginator);
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
            err => {
                error = true;
                console.log('Error:', err);
            },
            () => this.loading = false
        );
    }

    deleteTask(task: Task) {
        this.apiService.deleteTask(task).subscribe(
            data => this.tasks.splice(this.tasks.indexOf(task), 1),
            error => console.log(error),
            () => {}
        );
    }
}

class TaskData {
    /** Stream that emits whenever the data has been modified. */
    dataChange: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
    get data(): Task[] { return this.dataChange.value; }
    constructor(private _tasks: Task[]) {
        for (const task of this._tasks) {
            const copiedData = this.data.slice();
            copiedData.push(task);
            this.dataChange.next(copiedData);
        }
    }
}


class TaskTableDataSource extends DataSource<any> {
    get filter(): string { return this._filterChange.value; }
    set filter(filter: string) { this._filterChange.next(filter); }
    private _filterChange = new BehaviorSubject('');

    constructor(private _taskData: TaskData, private _paginator: MatPaginator) {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<Task[]> {
        const displayDataChanges = [
            this._taskData.dataChange,
            this._paginator.page,
            this._filterChange
        ];

        return Observable.merge(...displayDataChanges).map(() => {
            // Grab the page's slice of data.
            const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
            return this._taskData.data.slice().splice(startIndex, this._paginator.pageSize).filter((item: Task) => {
                const searchStr = (item.name + item.microchip.name).toLowerCase();
                return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
            });
        });
    }

    disconnect() {}
}
