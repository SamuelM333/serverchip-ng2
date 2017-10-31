import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';

import { Task } from '../../../shared/task';
import { Microchip } from '../../../shared/microchip';
import { ApiService } from '../../../shared/api.service';
// import { SocketIOService } from '../../../shared/socketio.service';

@Component({
    selector: 'app-microchip-view',
    templateUrl: './microchip-view.component.html',
    styles: [`
        .warn {
            color: red;
        }
    `]
})
export class MicrochipViewComponent implements OnInit, OnDestroy {

    _id: string;
    microchip: Microchip;
    microchipTemp: number;
    warning: boolean;
    tasks: Task[] = [];
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
        this.apiService.getMicrochipByID(this._id).subscribe(
            data => {
                this.microchip = data;
                this.apiService.getTaskByMicrochipID(this.microchip._id).subscribe(
                    microchipData => this.tasks = microchipData._items
                );
                // console.log(this.microchip);
                // this.socketIOService.sendMessage('join_room', { user: 'samuel', microchip: this.microchip.ip });
                /*this.socketIOService.getMessage('temperature_out')
                    .subscribe(
                        (tempData) => {
                            console.log(tempData);
                            if (tempData.ip === this.microchip.ip) {
                                this.microchipTemp = tempData.temp;
                            }
                        }
                    );*/
            },
            err => console.log('Error:', err),
            () => { this.loading = false; }
        );
    }

    ngOnDestroy() {
        // this.socketIOService.removeAllListeners('temperature_out');
        // this.socketIOService.sendMessage('leave_room', { microchip: this.microchip.ip });
    }

    back() {
        this.location.back();
    }

    openDialog() {
        const dialogRef = this.dialog.open(DeleteMicrochipDialogComponent, { data: this.microchip.name });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.deleteMicrochip();
            }
        });
    }

    deleteMicrochip() {
        this.apiService.deleteMicrochip(this.microchip).subscribe(
            data => this.router.navigateByUrl('/dashboard/microchips'),
            error => console.log(error),
            () => {}
        );
    }
}

@Component({
    selector: 'app-delete-task-dialog',
    template: `
        <p matDialogTitle>Alert</p>
        <mat-dialog-content> Are you sure want to do delete the microchip "{{data}}"?</mat-dialog-content>
        <mat-dialog-actions>
            <button mat-raised-button color="warn" [matDialogClose]="true">Delete</button>
            <button mat-raised-button color="primary" [matDialogClose]="false">Cancel</button>
        </mat-dialog-actions>
    `,
})
export class DeleteMicrochipDialogComponent {
    constructor(public dialogRef: MatDialogRef<DeleteMicrochipDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
}
