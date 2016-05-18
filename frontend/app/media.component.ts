/**
 *
 * Created by Yuan on 4/28/16.
 */

import {Component, Input} from 'angular2/core';
import {Media} from './media';
import {Router} from 'angular2/router';

@Component({
    selector : 'media',
    template : `<div class="container-fluid" style="float: left; width: 300px" (click)="onClick()">
                <ul class ="well" style="list-style-type: none; ">
                    <li class="list-item"><img src="https://www.cs.purdue.edu/homes/gwilkin/gwilkin-large.jpg" class="img-rounded" style="width: 100%"> </li>
                    <li class = "list-item">Category: {{media.category}}</li>
                    <li class = "list-item">Genre:{{media.genre}}</li>
                    <li class = "list-item">Condition:{{media.condition}}</li>
                    <li class = "list-item">Name:{{media.name}}</li>
                </ul>
                </div>
                `,
})

export class MediaComponent{
    @Input() media : Media;
    constructor(private _router : Router){

    }
    onClick(){
      this._router.navigate(['MediaDetails', {id : this.media.Media_id}]);
    }
}
