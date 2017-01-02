import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styles: []
})
export class TasksComponent implements OnInit, AfterViewInit {

    constructor() {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        document.getElementById("app").classList.add("header-fixed");
        document.getElementById("app").classList.add("sidebar-fixed");
        document.getElementById("app").classList.remove("sidebar-open");
    }

}
