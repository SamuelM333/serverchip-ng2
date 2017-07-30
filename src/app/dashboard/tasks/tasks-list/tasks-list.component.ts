import { Component, OnInit, AfterViewInit } from '@angular/core';


import { ApiService } from "../../../shared/api.service";
import { Task } from "../../../shared/task";


@Component({
    selector: 'app-tasks',
    templateUrl: './tasks-list.component.html',
    styleUrls: ['./tasks-list.component.sass'],
})
export class TasksListComponent implements OnInit, AfterViewInit {

    tasks: Task[] = [];
    pages: number[] = [];
    loading: boolean = true;
    task_to_delete: Task;

    constructor(private apiService: ApiService) { }

    ngOnInit() {
        this.loading = true;
        let error: boolean = false;
        let meta;
        this.apiService.getTasks().subscribe(
            data => {
                this.tasks = data._items;
                meta = data._meta;
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
                    this.pages.push(count)
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
