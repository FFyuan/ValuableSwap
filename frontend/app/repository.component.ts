/**
 *
 * Created by Yuan on 5/16/16.
 */
import {Component, OnInit} from 'angular2/core';
import {FORM_DIRECTIVES, FormBuilder, Validators, ControlGroup, NgIf, AbstractControl} from 'angular2/common';
import {MedialistComponent} from './medialist.component';
import {Router} from 'angular2/router';
import {MediaService} from './media.service';

@Component({
    selector : 'repository',
    templateUrl : 'app/repository.html',

    directives : [MedialistComponent, FORM_DIRECTIVES, NgIf]
})

export class RepositoryComponent{
    user : string;
    title = "My Items";
    category : string;

    form : ControlGroup;
        name : AbstractControl;
        genre : AbstractControl;
        system : AbstractControl;
        condition : AbstractControl;
        author : AbstractControl;

    constructor(fb : FormBuilder, private _mediaService : MediaService){
        this.form = fb.group({
            name : ['', Validators.required],
            genre : ['', Validators.required],
            system : [''],
            condition : ['', Validators.required],
            author : ['']
        });
        this.name = this.form.controls['name'];
        this.genre = this.form.controls['genre'];
        this.system = this.form.controls['system'];
        this.condition = this.form.controls['condition'];
        this.author = this.form.controls['author'];
    }

    ngOnInit(){
        this.user = localStorage.getItem('token');
    }

   onSubmit(value : any){
        console.log('Submitting : ', value);
        this._mediaService.postMedia(value, this.category, this.user);
        window.location.reload();
    }
}
