import { Component } from '@angular/core';
declare var $: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    // template: '<app-sidebar></app-sidebar>',
    styleUrls: ['./app.component.sass']
})
export class AppComponent {
    title = 'app works!';
}
