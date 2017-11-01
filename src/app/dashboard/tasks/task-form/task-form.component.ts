import { Component, OnInit, Inject, Input, OnChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';

import { ApiService } from '../../../shared/api.service';
import { Microchip } from '../../../shared/microchip';
import { Task } from '../../../shared/task';
import { Condition, DayHourCondition, InputPortCondition } from '../../../shared/condition';

@Component({
    selector: 'app-task-form',
    templateUrl: './task-form.component.html',
    styleUrls: ['./task-form.component.sass']
})
export class TaskFormComponent implements OnInit, OnChanges {

    @Input() editTask: Task;
    @Input() conditions: Condition[] = [];
    @Input() outputPort: number;
    @Input() selectedMicrochip: Microchip;

    task: Task;
    microchips: Microchip[];
    loading: boolean;
    availablePorts: number[];
    portsForTask: number[];
    portsForConditions: number[];
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;

    constructor(private router: Router,
                private apiService: ApiService,
                public dialog: MatDialog,
                private _formBuilder: FormBuilder) {

        this.firstFormGroup = this._formBuilder.group({
            selectedMicrochip: ['', Validators.required]
        });

        this.secondFormGroup = this._formBuilder.group({
            taskName: ['', Validators.required],
            outputPortNumber: ['', Validators.required],
            inputPortState: [true, Validators.required],
            taskDescription: [''],
            conditions: this._formBuilder.group({
                values: this._formBuilder.array([], Validators.minLength(1)) // TODO Here validators
            }, { validator: this.checkConditions })
        });
    }

    ngOnInit() {
        this.loading = true;


        this.apiService.getMicrochips().subscribe(
            data => this.microchips = data._items,
            error => {},
            () => this.loading = false
        );
    }

    ngOnChanges() {
        if (this.editTask) {
            this.firstFormGroup.patchValue({ selectedMicrochip: this.selectedMicrochip });
            this.secondFormGroup.patchValue({ taskName: this.editTask.name });
            this.secondFormGroup.patchValue({ taskDescription: this.editTask.description });
            this.secondFormGroup.patchValue({ outputPortNumber: this.editTask.output_port.number });
            if (this.conditions) {
                this.pushToConditionFormArray();
            }
        }
    }

    private get usedPorts() {
        const ports = [];
        this.conditions.forEach(condition => {
            if (condition instanceof InputPortCondition) {
                ports.push(condition.input_port.number);
            }
        });
        return ports;
    }

    private checkConditions(group: FormGroup): { emptyConditions: boolean } {
        const array = group.controls['values']['controls'];
        return array.length >= 1 ? null : { emptyConditions: true };
    }

    pushToConditionFormArray() {
        const control: FormArray = <FormArray>this.secondFormGroup.controls.conditions['controls']['values'];
        control.setValue([]);
        this.conditions.forEach(condition => {
            control.push(this._formBuilder.group({
                condition: condition
            }));
        });
    }

    selectMicrochip() {
        this.selectedMicrochip = this.firstFormGroup.value.selectedMicrochip;
        if (this.selectedMicrochip) {
            this.apiService.getAvailablePortsOfMicrochip(this.selectedMicrochip._id).subscribe(
                (data) => {
                    this.availablePorts = data.available_ports;
                    this.portsForTask = this.availablePorts.map(x => x);
                    this.portsForConditions = this.availablePorts.map(x => x);
                }
            );
        }
    }

    outputPortChange(outputPortSelected: number) {
        this.portsForTask = this.availablePorts.filter(port => this.usedPorts.indexOf(port) === -1 ? true : false);
        this.portsForConditions = this.availablePorts.filter(port => {
            return (this.usedPorts.indexOf(port) === -1 && port !== outputPortSelected) ? true : false;
        });

    }

    removeCondition(index: number) {
        this.conditions.splice(index, 1);
        this.outputPortChange(-1);
        this.pushToConditionFormArray();
    }

    openDialog() {
        const dialogRef = this.dialog.open(AddConditionDialogComponent, { data: this.portsForConditions });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                if (result.conditionType === 'InputPort') {
                    this.conditions.push(new InputPortCondition(result.name, 'InputPort', {
                        number: result.inputPortNumber,
                        state: result.inputPortState
                    }));
                    this.portsForTask = this.availablePorts.filter(port => {
                        return (this.usedPorts.indexOf(port) === -1 && result.inputPortNumber !== port) ? true : false;
                    });
                    this.portsForConditions = this.availablePorts.filter(port => {
                        return (this.usedPorts.indexOf(port) === -1 && port !== result.inputPortNumber) ? true : false;
                    });

                } else {
                    this.conditions.push(new DayHourCondition(result.name, 'DayHour', {
                        days: result.day,
                        hour: {
                            start: `${'0'.concat(result.startHour).slice(-2)}:${'0'.concat(result.startMinute).slice(-2)}`,
                            end: `${'0'.concat(result.endHour).slice(-2)}:${'0'.concat(result.endMinute).slice(-2)}`
                        }
                    }));
                }
                this.pushToConditionFormArray();

            }
        });
    }

    getDataFromForm() {
        const control = <FormArray>this.secondFormGroup.controls.conditions['controls']['values'];
        console.log(control);
        this.task = new Task(
            this.secondFormGroup.value.taskName,
            this.selectedMicrochip,
            {
                number: this.secondFormGroup.value.outputPortNumber,
                state: this.secondFormGroup.value.inputPortState
            },
            this.conditions,
            this.secondFormGroup.value.taskDescription
        );
        console.log(this.task);
    }

    onSubmit() {
        this.loading = true;

        for (const condition of this.task.conditions) {
            delete condition.conditionType;
        }

        console.log(this.task);

        if (this.editTask) {
            this.task._etag = this.editTask._etag;
            this.apiService.updateTask(this.editTask._id, this.task).subscribe(
                data => this.router.navigateByUrl('/dashboard/tasks/' + data._id),
                error => console.log('Error', error),
                () => this.loading = false
            );
        } else {
            delete this.task._id;
            delete this.task._etag;
            this.apiService.insertTask(this.task).subscribe(
                data => this.router.navigateByUrl('/dashboard/tasks/' + data._id),
                error => console.log('Error', error),
                () => this.loading = false
            );
        }
    }
}


@Component({
    selector: 'app-add-condition-dialog',
    templateUrl: './add-condition-dialog.component.html',
    styleUrls: ['./task-form.component.sass']
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
    HOURS = Array.from({ length: 24 }, (v, k) => `0${k}`.slice(-2));
    MINUTES = Array.from({ length: 60 }, (v, k) => `0${k}`.slice(-2));

    constructor(public dialogRef: MatDialogRef<AddConditionDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public availablePorts: any,
                formBuilder: FormBuilder) {
        this.options = formBuilder.group({
            conditionType: ['InputPort', Validators.required],
            name: ['', Validators.required],
            inputPortNumber: '-1',
            inputPortState: true,
            daySelect: '',
            startHourSelect: -1,
            startMinuteSelect: -1,
            endHourSelect: -1,
            endMinuteSelect: -1
        }, { validator: this.validateCondition });
    }

    private validateCondition(group: FormGroup): { validCondition: boolean } {
        if (group.value.conditionType === 'InputPort') {
            // Validate inputPort
            return group.value.inputPortNumber > -1 ? null : { validCondition: false };
        } else {
            // Validate day_hour
            const startHour = Number(group.value.startHourSelect);
            const startMinute = Number(group.value.startMinuteSelect);
            const endHour = Number(group.value.endHourSelect);
            const endMinute = Number(group.value.endMinuteSelect);

            if (endHour >= startHour) {
                if (endHour > startHour) {
                    return null;
                } else {
                    if (endMinute > startMinute) {
                        return null;
                    }
                }
            }
            return { validCondition: false };
        }
    }

    inputPortChange(portSelected: number) {
        // console.log(portSelected);
    }

    closeDialog() {
        console.log(this.options.valid);
        if (this.options.value.conditionType === 'InputPort') {
            const condition = {
                conditionType: this.options.value.conditionType,
                name: this.options.value.name,
                inputPortNumber: this.options.value.inputPortNumber,
                inputPortState: this.options.value.inputPortState
            };
            this.dialogRef.close(condition);

        } else {
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
        }
    }
}
