/**
 * Created by reitersg on 5/17/2016.
 */
import {Component, Input, OnInit, OnChanges, SimpleChange} from 'angular2/core';
import {MediaService} from './media.service';
import {Media} from './media';
import {MediaComponent} from './media.component';
import { RouteParams } from 'angular2/router';

@Component({

        selector : 'mediadetails',
        template : `<div class="container-fluid" style="float: left; width: 300px">
                <ul class ="well" style="list-style-type: none; ">
                    <li class="list-item"><img src="http://www.hdums.com/img/swap.png" class="img-rounded" style="width: 100%"> </li>
                    <li class ="list-item">User : {{media.username}}></li>
                    <li class = "list-item">Category: {{media.category}}</li>
                    <li class = "list-item">Genre:{{media.genre}}</li>
                    <li class = "list-item">Condition:{{media.condition}}</li>
                    <li class = "list-item">Name:{{media.name}}</li>
                    <li class = "list-item">Artist:{{media.artist}}</li>
                    <li class = "list-item">Author:{{media.author}}</li>
                    <li class = "list-item">Game System:{{media.game_system}}</li>
                </ul>
                </div>
                `
})


export class MediaDetailComponent{

        media : Media;

        constructor(private _routerPara : RouteParams, private _service : MediaService){}
        ngOnInit(){
                let id = +this._routerPara.get('id');
                console.log(id);
                this._service.getMediaById(id).subscribe(media => this.media = media);
        }
}