import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';

import { ApiService } from '../../../shared/api.service';
import { Microchip } from '../../../shared/microchip';
import { Task } from '../../../shared/task';
import { Condition, DayHourCondition, InputPortCondition } from '../../../shared/condition';

@Component({
    selector: 'app-task-creator',
    templateUrl: './task-creator.component.html',
    styleUrls: ['./task-creator.component.sass']
})
export class TaskCreatorComponent implements OnInit {

    loading: boolean;
    microchips: Microchip[];
    selectedMicrochip: Microchip;
    tabIndex = 0;
    availablePorts: number[];
    conditions: Condition[];
    outputPort: number;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;

    constructor(private router: Router,
                private apiService: ApiService,
                public dialog: MatDialog,
                private _formBuilder: FormBuilder) { }

    ngOnInit() {
        this.loading = true;
        this.conditions = [];
        this.firstFormGroup = this._formBuilder.group({
            firstCtrl: ['', Validators.required],
            selectedMicrochip: ['', Validators.required]
        });
        this.secondFormGroup = this._formBuilder.group({
            secondCtrl: ['', Validators.required],
            taskName: ['', Validators.required],
            outputPortNumber: [-1, Validators.required],
            inputPortState: [true, Validators.required],
            taskDescription: ['']
        });
        this.apiService.getMicrochips().subscribe(
            data => this.microchips = data._items,
            error => {},
            () => this.loading = false
        );
    }

    selectMicrochip() {
        this.selectedMicrochip = this.firstFormGroup.value.selectedMicrochip;
        if (this.selectedMicrochip) {
            console.log(this.selectedMicrochip);
            this.apiService.getAvailablePortsOfMicrochip(this.selectedMicrochip._id).subscribe(
                (data) => {
                    this.availablePorts = data.available_ports;
                    console.log(this.availablePorts);
                    this.tabIndex = 1;
                }
            );
        }
    }

    removeCondition(index: number) {
        this.conditions.splice(index, 1);
    }

    openDialog() {
        const dialogRef = this.dialog.open(AddConditionDialogComponent, { data: this.availablePorts });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                if (result.conditionType === 'InputPort') {
                    this.conditions.push(new InputPortCondition(result.name, 'InputPort', {
                        number: result.inputPortNumber,
                        state: result.inputPortState
                    }));
                } else {
                    this.conditions.push(new DayHourCondition(result.name, 'DayHour', {
                        day: result.day,
                        hour: {
                            start: `${result.startHour}:${result.startMinute}`,
                            end: `${result.endHour}:${result.endMinute}`,
                        }
                    }));
                }
            } else {
                console.log('cancel');
            }
        });
    }

    onSubmit(form: NgForm) {
        //     this.loading = true;
        //     let condition: Condition;
        //     let task: Task;
        //
        //     if (form.value.type == 'day_hour') {
        //         const days: string[] = [];
        //         form.value.condition_day_monday == true ? days.push('Monday') : {};
        //         form.value.condition_day_tuesday == true ? days.push('Tuesday') : {};
        //         form.value.condition_day_wednesday == true ? days.push('Wednesday') : {};
        //         form.value.condition_day_thursday == true ? days.push('Thursday') : {};
        //         form.value.condition_day_friday == true ? days.push('Friday') : {};
        //         form.value.condition_day_saturday == true ? days.push('Saturday') : {};
        //         form.value.condition_day_sunday == true ? days.push('Sunday') : {};
        //
        //         condition = new Condition(
        //             form.value.condition_name,
        //             { days: days, hour: form.value.hour + ':' + form.value.minutes }
        //         );
        //         delete condition.input_port;
        //
        //     } else {
        //         condition = new Condition(
        //             form.value.condition_name,
        //             null,
        //             { number: form.value.input_port, state: form.value.input_port_state }
        //         );
        //         delete condition.day_hour;
        //     }
        //
        //
        //
        //     task = new Task(
        //         form.value.task_name,
        //         form.value.microchip,
        //         { number: form.value.output_port, state: form.value.output_port_state },
        //         [condition]
        //     );
        //
        //     this.apiService.insertTask(task).subscribe(
        //         data => this.router.navigateByUrl('/dashboard/tasks/' + data._id),
        //         error => console.log('Error', error),
        //         () => this.loading = false
        //
        //     );
        //
        //     console.log(task);
    }

}

@Component({
    selector: 'app-add-condition-dialog',
    templateUrl: './add-condition-dialog.component.html',
    styleUrls: ['./task-creator.component.sass']
})
export class AddConditionDialogComponent {
    options: FormGroup;
    outputPort: number;
    DAYS = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
    ];
    HOURS = Array.from({ length: 24 }, (v, k) => k);
    MINUTES = Array.from({ length: 60 }, (v, k) => k);

    constructor(public dialogRef: MatDialogRef<AddConditionDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public availablePorts: any,
                formBuilder: FormBuilder) {
        this.options = formBuilder.group({
            conditionType: 'InputPort',
            name: '',
            inputPortNumber: '-1',
            inputPortState: true,
            daySelect: '',
            startHourSelect: -1,
            startMinuteSelect: -1,
            endHourSelect: -1,
            endMinuteSelect: -1
        });
    }

    private validateDayHourCondition(startHour: number, startMinute: number, endHour: number, endMinute: number) {
        // TODO Optimize
        if (endHour >= startHour) {
            if (endHour > startHour) {
                return true;
            } else {
                if (endMinute > startMinute) {
                    return true;
                }
            }
        }
        return false;
    }

    closeDialog() {
        if (this.options.value.conditionType === 'InputPort') {
            const condition = {
                conditionType: this.options.value.conditionType,
                name: this.options.value.name,
                inputPortNumber: this.options.value.inputPortNumber,
                inputPortState: this.options.value.inputPortState
            };
            this.dialogRef.close(condition);

        } else {
            if (this.validateDayHourCondition(this.options.value.startHourSelect, this.options.value.startMinuteSelect,
                    this.options.value.endHourSelect, this.options.value.endMinuteSelect)) {
                const condition = {
                    conditionType: this.options.value.conditionType,
                    name: this.options.value.name,
                    day: this.options.value.daySelect,
                    startHour: this.options.value.startHourSelect,
                    startMinute: this.options.value.startMinuteSelect,
                    endHour: this.options.value.endHourSelect,
                    endMinute: this.options.value.endMinuteSelect
                };
                this.dialogRef.close(condition);
            } else {
                this.dialogRef.close(false); // TODO Emit error here
            }
        }
    }
}
