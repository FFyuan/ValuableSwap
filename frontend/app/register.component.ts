/**
 * Created by reitersg on 5/13/2016.
 */

import { Component } from 'angular2/core';
import {Router} from 'angular2/router';
import {Authentication} from './authentication';
import {FORM_DIRECTIVES, CORE_DIRECTIVES, FormBuilder, Validators, Control, ControlGroup, NgIf, AbstractControl} from 'angular2/common';
@Component({
        selector : 'register',
        directives: [FORM_DIRECTIVES, CORE_DIRECTIVES],
        template :    `
    <div class = "well" >
    <h3>Enter your information here</h3>
    <form [ngFormModel]="form" (submit)="onSubmit(form.value)">
      <div *ngIf="error">Your passwords don't match</div>
      <div>
        <label for="UserName">UserName</label>
        <input type="text" ngControl="UserName">
        <div *ngIf="!UserName.valid && UserName.touched">
            UserName is Invalid
        </div>
      </div>
      <div>
        <label for="Name">Name</label>
        <input type="text" ngControl="Name">
        <div *ngIf="!Name.valid && Name.touched">
            Name is Invalid
        </div>
      </div>
      <div> 
        <label for="Email">Email</label>
        <input type="text" ngControl="Email">
        <div *ngIf="!Email.valid && Email.touched">
            Email is Invalid
        </div>
      </div>
      <div>
        <label for="Password">Password</label>
        <input type="password" ngControl="Password" >
        <div *ngIf="!Password.valid && Password.touched">
            Password is Invalid
        </div>
      </div>
      <div>
        <label for="CPassword">Confirm Password</label>
        <input type="password" ngControl="CPassword">
        <div *ngIf="form.errors.notMatching">
            Password not match
        </div>
      </div>
      <div class="form-group">
        <button type="submit" [disabled]="!form.errors.valid">Register</button>
      </div>
    </form>
    </div>
  `
})
export class RegisterComponent {
        form: ControlGroup;
        UserName : AbstractControl;
        Name : AbstractControl;
        Email : AbstractControl;
        Password : AbstractControl;
        CPassword : AbstractControl;

        constructor(fb: FormBuilder, public auth: Authentication, public router: Router) {
                this.form = fb.group({
                        UserName:  ['', Validators.required],
                        Name:  ['', Validators.required],
                        Email: ['', Validators.required],
                        Password: ['', Validators.required],
                        CPassword: ['', Validators.required]
                }, {validator : this.checkValidation()});
                this.UserName = this.form.controls['UserName'];
                this.Name = this.form.controls['Name'];
                this.Email = this.form.controls['Email'];
                this.Password = this.form.controls['Password'];
                this.CPassword = this.form.controls['CPassword'];
        };


        checkValidation(){
            return (group: ControlGroup): {[key: string]: any} => {
                var valid = true;
                for (name in  group.controls) {
                    var temp = group.controls[name].valid;
                    valid = valid && temp;
                }
                if (group.controls['Password'].value != group.controls['CPassword'].value) {
                    return {notMatching: true};
                }
                return {valid: valid};
            }
        }

        onSubmit(value: any) {
                console.log(value);
                this.auth.register(value.UserName, value.Name, value.Email, value.Password)
                    .subscribe(
                        (res: any) => {
                                if(res.success) {
                                        this.router.navigate(['Login']);
                                }else{
                                        console.log("Registration Failed");
                                }
                        }
                    );
                    
        }

}