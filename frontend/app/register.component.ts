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
    <div class="col-md-offset-2 col-md-10" style="padding-bottom: 10px">
        <h3>Enter your information here</h3>
    </div>
    <form class="form-horizontal" role="form" [ngFormModel]="form" (submit)="onSubmit(form.value)">

      <div class="form-group">
        <label class="control-label col-md-2" for="UserName">UserName:</label>
        <div class="col-md-6">
            <input class="form-control" type="text" ngControl="UserName">
        </div>

        <div class="row" *ngIf="!UserName.valid && UserName.touched">
            <div class="col-md-offset-2 col-md-8">
                <p class="bg-danger">UserName is Invalid</p>
            </div>
        </div>
      </div>

      <div class="form-group">
        <label class="control-label col-md-2" for="Name">Name:</label>
        <div class="col-md-6">
            <input class="form-control" type="text" ngControl="Name">
        </div>

        <div class="row" *ngIf="!Name.valid && Name.touched">
            <div class="col-md-offset-2 col-md-8">
            <p class="bg-danger">
            Name is Invalid
            </p>
            </div>
        </div>
      </div>

      <div class="form-group">
        <label class="control-label col-md-2" for="Email">Email:</label>
        <div class="col-md-6">
            <input class="form-control" type="text" ngControl="Email">
        </div>

        <div class="row" *ngIf="!Email.valid && Email.touched">
            <div class="col-md-offset-2 col-md-8">
            <p class="bg-danger">
            Email is Invalid
            </p>
            </div>
        </div>
      </div>

      <div class="form-group">
        <label class="control-label col-md-2" for="Password">Password:</label>
        <div class="col-md-6">
        <input class="form-control" type="password" ngControl="Password" >
        </div>
        <div class="row" *ngIf="!Password.valid && Password.touched">
            <div class="col-md-offset-2 col-md-8">
            <p class="bg-danger">
            Password is Invalid
            </p>
            </div>
        </div>
      </div>

      <div class="form-group">
        <label class="control-label col-md-2" for="CPassword">Confirm Password:</label>
        <div class="col-md-6">
        <input class="form-control" type="password" ngControl="CPassword">
        </div>
        <div class="row" *ngIf="form.errors.notMatching && CPassword.touched">
            <div class="col-md-offset-2 col-md-8">
            <p class="bg-danger">
            Password not match
            </p>
            </div>
        </div>
      </div>
      <div class="form-group">
        <div class="col-md-offset-2 col-md-10">
        <button class="btn btn-default" type="submit" [disabled]="!form.errors.valid">Register</button>
        </div>
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