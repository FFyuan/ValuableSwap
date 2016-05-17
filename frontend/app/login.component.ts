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
    <div class="col-md-offset-2 col-md-10" style="padding-bottom: 10px">
        <h3>Please Login</h3>
    </div>
    <form class="form-horizontal" role="form" [ngFormModel]="form" (submit)="onSubmit(form.value)">
      <div *ngIf="error" class="row">
      <div class="col-md-offset-2 col-md-6">
            <p class="bg-danger">
           Your username and password doesn't match
           </p>
      </div>
      </div>
      <div class="form-group">
        <label for="username" class="control-label col-md-2">Username:</label>
        <div class="col-md-6">
            <input type="text" class="form-control" ngControl="username">
        </div>
      </div>
      <div class="form-group">
        <label for="password" class="control-label col-md-2">Password:</label>
        <div class="col-md-6">
        <input type="password" class="form-control" ngControl="password" >
        </div>
      </div>
      <div class="form-group">
        <div class="col-md-offset-2 col-md-10">
        <button type="submit" class="btn btn-default" [disabled]="!form.valid">Login</button>
        </div>
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