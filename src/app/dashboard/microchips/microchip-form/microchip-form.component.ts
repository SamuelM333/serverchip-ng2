import { Component, Input, OnChanges } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from '../../../shared/api.service';
import { User } from '../../../shared/user';
import { Microchip } from '../../../shared/microchip';

@Component({
    selector: 'app-microchip-form',
    templateUrl: './microchip-form.component.html',
    styles: [`
        .form-field {
            width: 500px;
            margin-left: 0;
        }
    `]
})
export class MicrochipFormComponent implements OnChanges {
    @Input() user: User;
    @Input() editMicrochip: Microchip;
    name: string;
    formGroup: FormGroup;

    constructor(private router: Router, private apiService: ApiService, private location: Location, private formBuilder: FormBuilder) {
        this.formGroup = formBuilder.group({
            name: '',
            ip: '',
            description: ''
        });
    }

    ngOnChanges() {
        if (this.editMicrochip) {
            this.formGroup.patchValue({ name: this.editMicrochip.name });
            this.formGroup.patchValue({ ip: this.editMicrochip.ip });
            if (this.editMicrochip.description) {
                this.formGroup.patchValue({ description: this.editMicrochip.description });
            }
        }
    }

    onSubmit() {
        // TODO Check for unique IP
        const microchip = new Microchip(
            this.formGroup.value.name,
            this.user,
            this.formGroup.value.ip,
            this.formGroup.value.description ? this.formGroup.value.description : '',
            this.editMicrochip._id,
            this.editMicrochip._etag
        );

        if (this.editMicrochip) {
            this.apiService.updateMicrochip(this.editMicrochip._id, microchip).subscribe(
                data => this.router.navigateByUrl('/dashboard/microchips/' + data._id),
                error => console.log('Error', error)
            );
        } else {
            this.apiService.insertMicrochip(microchip).subscribe(
                data => this.router.navigateByUrl('/dashboard/microchips/' + data._id),
                error => console.log('Error', error)
            );
        }


    }

}
