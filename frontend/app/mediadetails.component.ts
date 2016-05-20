/**
 * Created by reitersg on 5/17/2016.
 */
import {Component, Input, OnInit, OnChanges, SimpleChange} from 'angular2/core';
import {MediaService} from './media.service';
import {Media} from './media';
import {MediaComponent} from './media.component';
import { RouteParams } from 'angular2/router';
import {userLoggined} from './userLoggined.function';
import {MessagePostComponent} from './messagepost.component';
import {TradeService} from './trade.service';

@Component({

        selector : 'mediadetails',
        template : `<div class="container-fluid" >
                <ul *ngIf="media" class ="well" style="list-style-type: none; ">
                    <li class = "list-item"><img src="https://www.cs.purdue.edu/homes/gwilkin/gwilkin-large.jpg" class="img-rounded" style="width: 100%"> </li>
                    <li class = "list-item">User : {{media.username}}</li>
                    <li class = "list-item">Category: {{media.category}}</li>
                    <li class = "list-item">Genre:{{media.genre}}</li>
                    <li class = "list-item">Condition:{{media.condition}}</li>
                    <li class = "list-item">Name:{{media.name}}</li>

                    <li *ngIf="media.category.includes('Music')" class = "list-item">Artist:{{media.artist}}</li>
                    <li *ngIf="media.category.includes('Book')" class = "list-item">Author:{{media.author}}</li>
                    <li *ngIf="media.category.includes('Game')" class = "list-item">Game Console:{{media.game_system}}</li>
                    <li *ngIf="media.category.includes('Movie')" class = "list-item">Movie System:{{media.movie_system}}</li>
                <div class="row" *ngIf="owner">
                <button class="btn btn-default" style="float: right;  " (click)="addWishlist()">Add to Wishlist</button>
                </div>
                <div class="row" *ngIf="owner">
                <button class="btn btn-default" style="float: left;  " (click)="requestTrade()">Request for a Trade</button>
                </div>
                <form *ngIf="requested" class="form-horizontal" role="form">
                    <div class="form-group">
                        <label for="item" class="control-label col-md-3">Select your item to be traded</label>
                        <div class="col-md-4">
                            <select class="form-control" [(ngModel)]="item">
                                <option *ngFor = '#myMedia of medias' [value]="myMedia.Media_id">{{myMedia.name}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-md-4">
                            <button class="btn btn-default" type="submit" [disabled]="!item" (click)="submitTrade()">Submit Request</button>
                        </div>
                    </div>
                </form>
                </ul>
                <message-post *ngIf="media && owner" [target]="media.username" [owner]="owner"></message-post>
                </div>`,
        directives : [MessagePostComponent]

})


export class MediaDetailComponent{

        media : any;
        owner : string;
        requested : boolean = false;
        medias : Media[];
        item : number;

        constructor(private _routerPara : RouteParams, private _service : MediaService, private _tradeService : TradeService){
        }
        ngOnInit(){
                this.owner = userLoggined();
                let id = +this._routerPara.get('id');
                console.log(id);
                this._service.getMediaById(id).subscribe(medias =>{
                    console.log(medias[0]);
                    this.media = medias[0];
                    this._service.getMediasOwnBy(this.owner).subscribe(medias =>{
                        this.medias = medias
                    });
                });
                this.requested = false;
        }
        addWishlist(){
            let username = userLoggined();
            this._service.addWishlist(this.media, username).subscribe(
                (res:any)=>{
                    if(res.success){
                        console.log("Adding to wishlist success")
                    }else{
                        console.log("Adding to wishlist Failed");
                    }
                }
            );
        }
        submitTrade(){
            console.log(this.item);
            console.log(this.owner, this.media.username, this.item, this.media.Media_id);
            return this._tradeService.requestTrade(this.owner, this.media.username, this.item, this.media.Media_id).subscribe(res =>
                console.log(res)
            );
        }

        requestTrade(){
            this.requested = !this.requested;
        }

}
