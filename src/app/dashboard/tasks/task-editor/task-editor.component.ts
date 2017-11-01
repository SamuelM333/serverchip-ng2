import { Component, OnInit, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';

import { ApiService } from '../../../shared/api.service';
import { Microchip } from '../../../shared/microchip';
import { Task } from '../../../shared/task';
import { Condition, DayHourCondition, InputPortCondition } from '../../../shared/condition';

@Component({
    selector: 'app-task-editor',
    templateUrl: './task-editor.component.html'
})
export class TaskEditorComponent implements OnInit {

    _id: string;
    loading: boolean;
    microchips: Microchip[];
    selectedMicrochip: Microchip;
    task: Task;
    availablePorts: number[];
    conditions: Condition[];
    outputPort: number;


    constructor(private router: Router,
                private apiService: ApiService,
                private activatedRoute: ActivatedRoute) {
        this._id = activatedRoute.snapshot.params['id'];
    }

    ngOnInit() {
        this.loading = true;

        this.apiService.getTaskByID(this._id).subscribe(
            (data) => {
                this.task = data;
                this.selectedMicrochip = this.task.microchip;
                this.conditions = this.task.conditions;
                this.outputPort = this.task.output_port.number;
                this.loading = false;
                console.log(this.task._id);
            }
        );

    }

    onSubmit(form: NgForm) {
        this.loading = true;

        delete this.task._id;
        delete this.task._etag;
        for (const condition of this.task.conditions) {
            delete condition.conditionType;
        }

        console.log(this.task);

        this.apiService.insertTask(this.task).subscribe(
            data => this.router.navigateByUrl('/dashboard/tasks/' + data._id),
            error => console.log('Error', error),
            () => this.loading = false
        );
    }
}
