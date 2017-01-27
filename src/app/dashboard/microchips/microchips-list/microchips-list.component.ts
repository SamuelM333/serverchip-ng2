import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiService } from "../../../shared/api.service";
import { Microchip } from "../../../shared/microchip";

declare const $: any;

@Component({
    selector: 'app-microchips',
    templateUrl: './microchips-list.component.html',
    styleUrls: ['./microchips-list.component.sass']
})
export class MicrochipsListComponent implements OnInit, AfterViewInit {

    microchips: Microchip[];
    pages: number[] = [];

    constructor(private apiService: ApiService) { }

    ngOnInit() {
        let error: boolean = false;
        let meta;
        this.apiService.getMicrochips().subscribe(
            data => {
                this.microchips = data._items;
                meta = data._meta;
                for (let i = 0; i < this.microchips.length; i++) {
                    this.apiService.getTaskByMicrochipID(this.microchips[i]._id).subscribe(
                        data => { this.microchips[i].tasks = data._items }
                    );
                }
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
            }
        );
    }

    ngAfterViewInit() {
        document.getElementById("app").classList.add("header-fixed");
        document.getElementById("app").classList.add("sidebar-fixed");
        document.getElementById("app").classList.remove("sidebar-open");
    }

}
