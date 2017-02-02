import { Component, OnInit, AfterViewInit, ViewChild, Renderer } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { ApiService } from "../../../shared/api.service";
import { Microchip } from "../../../shared/microchip";
import { Task } from "../../../shared/task";
import { Condition } from "../../../shared/condition";
import { toASCII } from "punycode";
import { isUndefined } from "util";

@Component({
    selector: 'app-task-creator',
    templateUrl: './task-creator.component.html',
    styleUrls: ['./task-creator.component.sass']
})
export class TaskCreatorComponent implements OnInit {

    loading: boolean;
    microchips: Microchip[];
    isInputPort: boolean = true;

    constructor(private router: Router, private apiService: ApiService, private renderer: Renderer) { }

    ngOnInit() {
        this.loading = true;
        this.apiService.getMicrochips().subscribe(
            data => this.microchips = data._items,
            error => {},
            () => this.loading = false
        );
    }

    onSubmit(form: NgForm) {
        this.loading = true;
        let condition: Condition;
        let task: Task;

        if (form.value.type == 'datetime') {
            let days: string[] = [];
            form.value.condition_day_monday == true ? days.push("Monday") : {};
            form.value.condition_day_tuesday == true ? days.push("Tuesday") : {};
            form.value.condition_day_wednesday == true ? days.push("Wednesday") : {};
            form.value.condition_day_thursday == true ? days.push("Thursday") : {};
            form.value.condition_day_friday == true ? days.push("Friday") : {};
            form.value.condition_day_saturday == true ? days.push("Saturday") : {};
            form.value.condition_day_sunday == true ? days.push("Sunday") : {};

            condition = new Condition(
                form.value.condition_name,
                { days: days, hour: form.value.hour + ':' + form.value.minutes }
            );
            delete condition.input_port;

        } else {
            condition = new Condition(
                form.value.condition_name,
                null,
                { number: form.value.input_port, state: form.value.input_port_state }
            );
            delete condition.datetime;
        }



        task = new Task(
            form.value.task_name,
            form.value.microchip,
            { number: form.value.output_port, state: form.value.output_port_state },
            [condition]
        );

        this.apiService.insertTask(task).subscribe(
            data => this.router.navigateByUrl('/dashboard/tasks/' + data._id),
            error => console.log("Error", error),
            () => this.loading = false

        );

        console.log(task);
    }

    checkType(data) { this.isInputPort = data == 'input_port'; }

}
