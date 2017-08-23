import { NgModule } from '@angular/core';
import { CdkTableModule } from '@angular/cdk';
import {
    MdButtonModule,
    MdCheckboxModule,
    MdSidenavModule,
    MdMenuModule,
    MdIconModule,
    MdToolbarModule,
    MdTooltipModule,
    MdListModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdCardModule,
    MdDialogModule,
    MdGridListModule,
    MdTableModule,
    MdInputModule,
    MdPaginatorModule,
    MdSortModule,
    MdAutocompleteModule
} from '@angular/material';

const modules = [
    CdkTableModule,
    MdButtonModule,
    MdCheckboxModule,
    MdSidenavModule,
    MdMenuModule,
    MdIconModule,
    MdToolbarModule,
    MdTooltipModule,
    MdListModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdCardModule,
    MdDialogModule,
    MdGridListModule,
    MdTableModule,
    MdInputModule,
    MdPaginatorModule,
    MdSortModule,
    MdAutocompleteModule
];

@NgModule({
    imports: modules,
    exports: modules
})
export class MaterialModule {}
