import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { compareSync } from 'bcryptjs';


import { ApiService } from '../../shared/api.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['../auth-styles.sass']
})
export class LoginComponent implements OnInit {
    formGroup: FormGroup;

    constructor(private formBuilder: FormBuilder, private apiSerivice: ApiService, private router: Router, private snackBar: MatSnackBar) {
        this.formGroup = formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            // remember: [false, Validators.required]
        });
    }

    ngOnInit() {
        if (!!localStorage.getItem('authUser')) {
            this.router.navigateByUrl('/dashboard');
        }
    }

    onSubmit() {
        if (this.formGroup.valid) {
            this.apiSerivice.getUser(this.formGroup.value.email).subscribe(
                (user) => {
                    if (compareSync(this.formGroup.value.password, user.password)) {
                        // if (this.formGroup.value.remember) {
                            localStorage.setItem('authUser', JSON.stringify(user));
                        // }
                        this.router.navigateByUrl('/dashboard');
                    } else {
                        this.showErrorSnackBar();
                    }
                },
                (err) => {
                    // TODO Catch 404 here
                    this.showErrorSnackBar();
                }
            );
        }
    }

    private showErrorSnackBar() {
        this.snackBar.open('Wrong credentials', 'Close', {
            duration: 3000
        });
    }
}
