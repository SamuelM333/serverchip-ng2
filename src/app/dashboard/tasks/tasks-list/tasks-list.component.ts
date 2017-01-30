import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiService } from "../../../shared/api.service";
import { Task } from "../../../shared/task";

declare const $: any;

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks-list.component.html',
    styleUrls: ['./tasks-list.component.sass']
})
export class TasksListComponent implements OnInit, AfterViewInit {

    tasks: Task[] = [];
    pages: number[] = [];
    loading: boolean = true;

    constructor(private apiService: ApiService) { }

    ngOnInit() {
        this.loading = true;
        let error: boolean = false;
        let meta;
        this.apiService.getTasks().subscribe(
            data => {
                this.tasks = data._items;
                meta = data._meta;
            },
            err => {
                error = true;
                console.log('Error:', err);
            },
            () => {
                let total = meta.total;
                let count = 0;
                while (total > 0) {
                    count += 1;
                    this.pages.push(count)
                    total -= meta.max_results;
                }
                // Item actions init
                setTimeout(function () {
                    $(function () {
                        var $itemActions = $(".item-actions-dropdown");

                        $(document).on('click', function (e) {
                            if (!$(e.target).closest('.item-actions-dropdown').length) {
                                $itemActions.removeClass('active');
                            }
                        });

                        $('.item-actions-toggle-btn').on('click', function (e) {
                            e.preventDefault();

                            var $thisActionList = $(this).closest('.item-actions-dropdown');

                            $itemActions.not($thisActionList).removeClass('active');

                            $thisActionList.toggleClass('active');
                        });
                    });
                }, 500);

                this.loading = false;
            }
        );
    }

    ngAfterViewInit() {
        document.getElementById("app").classList.add("header-fixed");
        document.getElementById("app").classList.add("sidebar-fixed");
        document.getElementById("app").classList.remove("sidebar-open");
    }

}
