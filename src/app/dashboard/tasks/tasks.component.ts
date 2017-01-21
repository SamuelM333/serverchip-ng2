import { Component, AfterViewInit } from '@angular/core';

declare const $: any;

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styles: []
})
export class TasksComponent implements AfterViewInit {

    constructor() {
    }

    ngAfterViewInit() {
        document.getElementById("app").classList.add("header-fixed");
        document.getElementById("app").classList.add("sidebar-fixed");
        document.getElementById("app").classList.remove("sidebar-open");

        // Item actions init
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
    }

}
