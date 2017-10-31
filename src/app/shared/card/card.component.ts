import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-card',
    template: `
        <mat-card class="main-card" [style.width.%]="cardWidth">
            <mat-card-title>{{cardTitle}}</mat-card-title>
            <ng-content></ng-content>
        </mat-card>
    `,
    styles: [`
        .main-card {
            display: table;
            margin: 0 auto;
        }
    `]
})

export class CardComponent {
    @Input() cardTitle = '';
    @Input() cardWidth = 33;
}
