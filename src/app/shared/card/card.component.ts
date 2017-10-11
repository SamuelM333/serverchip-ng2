import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-card',
    template: `
        <mat-card class="main-card" [style.width.%]="cardWidth">
            <mat-card-content>
                <div>
                    <ng-content></ng-content>
                </div>
            </mat-card-content>
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
    @Input() cardWidth = 33;
}
