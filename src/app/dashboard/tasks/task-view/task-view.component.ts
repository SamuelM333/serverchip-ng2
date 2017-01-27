import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ApiService } from "../../../shared/api.service";
import { Task } from "../../../shared/task";

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.sass']
})
export class TaskViewComponent implements OnInit {

    _id: string;
    task: Task;

    constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute) {
        this._id = activatedRoute.snapshot.params['id'];
    }

  ngOnInit() {
        this.apiService.getTaskByID(this._id).subscribe(
            data => {this.task = data},
            err => {console.log("Error", err)},
            () =>  {}
        );
  }

}
