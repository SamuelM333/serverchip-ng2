import { Location } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';

import { ApiService } from '../../../shared/api.service';
import { Task } from '../../../shared/task';
import { SocketIOService } from '../../../shared/socketio.service';

@Component({
    selector: 'app-task-view',
    templateUrl: './task-view.component.html'
})
export class TaskViewComponent implements OnInit {

    _id: string;
    task: Task;
    loading: boolean;

    constructor(public dialog: MatDialog,
                private apiService: ApiService,
                // private socketIOService: SocketIOService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private location: Location) {
        this._id = activatedRoute.snapshot.params['id'];
    }

    ngOnInit() {
        this.loading = true;
        this.apiService.getTaskByID(this._id).subscribe(
            data => { this.task = data; console.log(this.task); },
            err => console.log('Error', err),
            () => this.loading = false
        );
        // this.socketIOService.sendMessage('var', null);
        // this.socketIOService.getMessage('temperature_out').subscribe(data => this.read = data);
    }

    back() {
        this.location.back();
    }

    openDialog() {
        const dialogRef = this.dialog.open(DeleteTaskDialogComponent, { data: this.task.name });
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
        <p matDialogTitle>Alert</p>
        <mat-dialog-content>Are you sure want to do delete the task "{{data}}"?</mat-dialog-content>
        <mat-dialog-actions>
            <button mat-raised-button color="warn" [matDialogClose]="true">Delete</button>
            <button mat-raised-button color="primary" [matDialogClose]="false">Cancel</button>
        </mat-dialog-actions>
    `,
})
export class DeleteTaskDialogComponent {
    constructor(public dialogRef: MatDialogRef<DeleteTaskDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
}
