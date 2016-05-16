/**
 * Created by reitersg on 5/13/2016.
 */

import { Component } from 'angular2/core';
import {Router} from 'angular2/router';
import {Authentication} from './authentication';
import {FORM_DIRECTIVES, FormBuilder, Validators, ControlGroup, NgIf} from 'angular2/common';
@Component({
        selector : 'register',
        directives: [FORM_DIRECTIVES, NgIf],
        template :    `
    <div class = "well" >
    <h3>Enter your information here</h3>
    <form [ngFormModel]="form" (submit)="onSubmit(form.value)">
      <div *ngIf="error">Your passwords don't match</div>
      <div>
        <label for="UserName">UserName</label>
        <input type="text" ngControl="UserName">
      </div>
      <div>
        <label for="Name">Name</label>
        <input type="text" ngControl="Name">
      </div>
      <div> 
        <label for="Email">Email</label>
        <input type="text" ngControl="Email">
      </div>
      <div>
        <label for="Password">Password</label>
        <input type="password" ngControl="Password">
      </div>
      <div>
        <label for="confirm password">Confirm Password</label>
        <input type="password" ngControl="password">
        </div>
      <div class="form-group">
        <button type="submit" [disabled]="!form.valid">Register</button>
      </div>
    </form>
    </div>
  `
})
export class RegisterComponent {
        form: ControlGroup;
        error: boolean = false;
        constructor(fb: FormBuilder, public auth: Authentication, public router: Router) {
                this.form = fb.group({
                        UserName:  ['', Validators.required],
                        Name:  ['', Validators.required],
                        Email: ['', Validators.required],
                        Password: ['', Validators.required]
                });
        }
        onSubmit(value: any) {
                this.auth.register(value.UserName, value.Name, value.Email, value.Password)
                    .subscribe(
                        (token: any) => {
                                this.router.navigate(['Login']);
                        },
                        () => { this.error = true;
                                console.log("Registration Failed");}
                    );
                    
        }

}