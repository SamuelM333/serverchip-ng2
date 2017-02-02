import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../shared/api.service';
import { Task } from '../../../shared/task';

@Component({
    selector: 'app-task-view',
    templateUrl: './task-view.component.html',
    styleUrls: ['./task-view.component.sass']
})
export class TaskViewComponent implements OnInit {

    _id: string;
    task: Task;
    loading: boolean;

    constructor(private apiService: ApiService, private router: Router, private activatedRoute: ActivatedRoute) {
        this._id = activatedRoute.snapshot.params['id'];
    }

    ngOnInit() {
        this.loading = true;
        this.apiService.getTaskByID(this._id).subscribe(
            data => this.task = data,
            err => console.log('Error', err),
            () => this.loading = false
        );
    }

    deleteTask() {
        let success = false;
        this.apiService.deleteTask(this.task).subscribe(
            data => success = true,
            error => console.log(error),
            () => success == true ? this.router.navigateByUrl('/dashboard/tasks') : console.log('error')
        );
    }

}
