import { NgModule } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';
import {
    MatButtonModule,
    MatStepperModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatMenuModule,
    MatIconModule,
    MatRadioModule,
    MatToolbarModule,
    MatTabsModule,
    MatTooltipModule,
    MatListModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatDialogModule,
    MatGridListModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSortModule,
    MatAutocompleteModule,
    MatSnackBarModule
} from '@angular/material';

const modules = [
    CdkTableModule,
    MatStepperModule,
    MatButtonModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatMenuModule,
    MatIconModule,
    MatRadioModule,
    MatToolbarModule,
    MatTabsModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatListModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatDialogModule,
    MatGridListModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSortModule,
    MatAutocompleteModule
];

@NgModule({
    imports: modules,
    exports: modules
})
export class MaterialModule {}
