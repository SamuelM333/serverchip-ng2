import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { hashSync } from 'bcryptjs';

import { ApiService } from '../../shared/api.service';


@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['../auth-styles.sass']

})
export class SignupComponent implements OnInit {
    formGroup: FormGroup;
    nonUniqueEmail = false;

    constructor(private formBuilder: FormBuilder, private apiSerivice: ApiService, private router: Router, private snackBar: MatSnackBar) {
        this.formGroup = formBuilder.group({
            name: ['', Validators.required],
            last_name: '',
            email: ['', [Validators.required, Validators.email]],
            passwords: this.formBuilder.group({
                    password: ['', [Validators.required, Validators.minLength(8)]],
                    rePassword: ['', Validators.required]
                }, { validator: this.passwordConfirming }
            )
        });
    }

    ngOnInit() {
        if (!!localStorage.getItem('authUser')) {
            this.router.navigateByUrl('/dashboard');
        }
    }

    onSubmit() {
        // console.log(this.formGroup.value);
        this.nonUniqueEmail = false;
        if (this.formGroup.valid) {
            const authUser = {
                name: this.formGroup.value.name,
                last_name: this.formGroup.value.last_name,
                email: this.formGroup.value.email,
                password: hashSync(this.formGroup.get('passwords').value.password)
            };

            this.apiSerivice.insertUser(authUser).subscribe(
                (user) => {
                    console.log(user);
                    localStorage.setItem('authUser', JSON.stringify(authUser));
                    this.router.navigateByUrl('/dashboard');
                },
                (err) => {
                    // TODO Catch 404 here
                    console.log(err);
                    const issues = JSON.parse(err._body)._issues;
                    console.log(issues);

                    if (issues.email === `value '${authUser.email}' is not unique`) {
                        this.nonUniqueEmail = true;
                        this.snackBar.open('This email address is already in use', 'Close', {
                            duration: 3000,
                            extraClasses: ['dark-snack-bar']
                        });
                    }
                }
            );
        }
    }

    private passwordConfirming(group: FormGroup): { notSame: boolean } {
        const password = group.controls.password.value;
        const rePassword = group.controls.rePassword.value;
        return password === rePassword ? null : { notSame: true };
    }

}
