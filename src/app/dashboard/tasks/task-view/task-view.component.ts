import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MD_DIALOG_DATA, MdDialog, MdDialogRef } from '@angular/material';

import { ApiService } from '../../../shared/api.service';
import { Task } from '../../../shared/task';

@Component({
    selector: 'app-task-view',
    templateUrl: './task-view.component.html'
})
export class TaskViewComponent implements OnInit {

    _id: string;
    task: Task;
    loading: boolean;

    constructor(public dialog: MdDialog,
                private apiService: ApiService,
                private router: Router,
                private activatedRoute: ActivatedRoute) {
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

    openDialog() {
        const dialogRef = this.dialog.open(DeleteTaskDialogComponent, {data: this.task.name});
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.deleteTask();
            }
        });
    }

    deleteTask() {
        let success = false;
        this.apiService.deleteTask(this.task).subscribe(
            data => success = true,
            error => console.log(error),
            () => success === true ? this.router.navigateByUrl('/dashboard/tasks') : console.log('error')
        );
    }
}

@Component({
    selector: 'app-delete-task-dialog',
    template: `
        <p md-dialog-title>Alert</p>
        <md-dialog-content> Are you sure want to do delete the microchip "{{data}}"? </md-dialog-content>
        <md-dialog-actions>
          <button md-raised-button color="warn" [md-dialog-close]="true">Delete</button>
          <button md-raised-button color="primary" [md-dialog-close]="false">Cancel</button>
        </md-dialog-actions>
    `,
})
export class DeleteTaskDialogComponent {
    constructor(public dialogRef: MdDialogRef<DeleteTaskDialogComponent>, @Inject(MD_DIALOG_DATA) public data: any) { }
}
