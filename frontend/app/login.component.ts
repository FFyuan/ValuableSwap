/**
 *
 * Created by Yuan on 5/12/16.
 */

import {Component, OnInit} from 'angular2/core';
import {FORM_DIRECTIVES, FormBuilder, Validators, ControlGroup, NgIf} from 'angular2/common';
import {Router} from 'angular2/router';
import {Authentication} from './authentication';

@Component({
    selector: 'login',
    directives: [ FORM_DIRECTIVES, NgIf ],
    template: `
    <div class = "well" >
    <h3>Please Login</h3>
    <form [ngFormModel]="form" (submit)="onSubmit(form.value)">
      <div *ngIf="error">Your username and password doesn't match</div>
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" ngControl="username">
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" ngControl="password" >
      </div>
      <div class="form-group">
        <button type="submit" [disabled]="!form.valid">Login</button>
      </div>
    </form>
    </div>
  `
})

export class LoginComponent {
    form: ControlGroup;
    error: boolean = false;
    constructor(fb: FormBuilder, public auth: Authentication, public router: Router) {
        this.form = fb.group({
            username:  ['', Validators.required],
            password:  ['', Validators.required]
        });
    }

    ngOnInit(){
        if(localStorage.getItem('token')){
            this.router.navigate(['Home']);
        }
    }

    onSubmit(value: any) {
        this.auth.login(value.username, value.password)
            .subscribe(
                (token: any) => {
                        this.router.navigate(['Home']);
                        window.location.reload();
                },
                () => { this.error = true;
                        console.log("Loggin Failed");}
            );
    }
}