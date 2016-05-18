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
    template : `
                <div class="well">
                    <h3>{{title}}</h3>
                    <media-list [ownBy]="user"> </media-list>
                </div>
                <div class="well">
                    <h3>Post a new item</h3>
                    {{category}}
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label for="category" class="control-label col-md-2">Category:</label>
                            <div class="col-md-6">
                                 <select class="form-control" [(ngModel)]="category">
                                    <option value="Game">Game</option>
                                    <option value="Music">Music</option>
                                    <option value="Movie">Movie</option>
                                    <option value="Book">Book</option>
                                 </select>
                            </div>
                        </div>
                    </form>

                    <form *ngIf="category === 'Game'" class="form-horizontal" role="form" [ngFormModel]="gameForm" (submit)="gameSubmit(gameForm.value)">
                    Game Form
                        <div class="form-group">
                            <label class="control-label col-md-2" for="name">Name:</label>
                            <div class="col-md-6">
                                <input class="form-control" type="text" ngControl="gameName">
                            </div>
                        </div>

                         <div class="row" *ngIf="!gameName.valid && gameName.touched">
                            <div class="col-md-offset-2 col-md-6">
                                <p class="bg-danger">
                                    Name is Invalid
                                </p>
                            </div>
                         </div>

                    </form>



                </div>

    `,

    directives : [MedialistComponent, FORM_DIRECTIVES, NgIf]
})

export class RepositoryComponent{
    user : string;
    title = "My Items";
    category : string;

    gameForm : ControlGroup;
        gameName : AbstractControl;

    movieForm : ControlGroup;

    musicForm : ControlGroup;

    bookForm : ControlGroup;

    constructor(fb : FormBuilder, private _mediaService : MediaService){
        this.gameForm = fb.group({
            gameName : ['', Validators.required]
        });
        this.gameName = this.gameForm.controls['gameName'];
    }

    ngOnInit(){
        this.user = localStorage.getItem('token');
    }

    onSumbit(value : any){

    }
}
