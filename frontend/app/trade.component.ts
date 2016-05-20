/**
 *
 * Created by Yuan on 5/20/16.
 */

import {Component, Input, OnInit} from 'angular2/core';
import {NgIf} from 'angular2/common';
import {Trade} from './trade';
import {MediaService} from './media.service';
import {Media} from './media';
import {userLoggined} from './userLoggined.function';
import {MediaComponent} from './media.component';
import {TradeService} from './trade.service';
import {Router} from 'angular2/router';

@Component({
    selector : 'trade',
    directives : [MediaComponent],
    template : `
                <div *ngIf="trade && detailed && !trade.confirm" class="list-group-item" (click)="setDetailed()">
                    <div *ngIf="owner == trade.user_1" class="row">
                        <div class="col-md-2">You want to trade</div>
                        <div class="col-md-3">
                            <media [media]="item1"></media>
                        </div>
                        <div class="col-md-2">with {{trade.user_2}}'s</div>
                        <div class="col-md-3">
                            <media [media]="item2"></media>
                        </div>
                    </div>
                    <div *ngIf="owner == trade.user_2" class="row">
                        <div class="col-md-2">{{trade.user_1}} want to trade</div>
                        <div class="col-md-3">
                            <media [media]="item1"></media>
                        </div>
                        <div class="col-md-2">with your</div>
                        <div class="col-md-3">
                            <media [media]="item2"></media>
                        </div>
                        <button class=" btn btn-default" type="submit" (click)="confirmTrade()">Confirm!</button>
                    </div>
                </div>
                <div *ngIf="trade && !detailed && !trade.confirm" class="list-group-item" (click)="setDetailed()">
                    <div *ngIf="owner == trade.user_1" >
                       You've sent a Trade request to {{trade.user_2}}
                    </div>
                    <div *ngIf="owner == trade.user_2" >
                        {{trade.user_1}} want to trade with you
                    </div>
                </div>
               <div *ngIf="trade && detailed && trade.confirm" class="list-group-item" (click)="setDetailed()">
                    <div *ngIf="owner == trade.user_1" class="row">
                        <div class="col-md-2">You have traded</div>
                        <div class="col-md-3">
                            <media [media]="item1"></media>
                        </div>
                        <div class="col-md-2">with {{trade.user_2}}'s</div>
                        <div class="col-md-3">
                            <media [media]="item2"></media>
                        </div>
                    </div>
                    <div *ngIf="owner == trade.user_2" class="row">
                        <div class="col-md-2">You have traded</div>
                        <div class="col-md-3">
                            <media [media]="item2"></media>
                        </div>
                        <div class="col-md-2">with {{trade.user_1}}'s</div>
                        <div class="col-md-3">
                            <media [media]="item1"></media>
                        </div>
                        <button class=" btn btn-default" type="submit" (click)="confirmTrade()">Confirm!</button>
                    </div>
                </div>
                <div *ngIf="trade && !detailed && trade.confirm" class="list-group-item" (click)="setDetailed()">
                    <div *ngIf="owner == trade.user_1" >
                        You've traded with {{trade.user_2}}
                    </div>
                    <div *ngIf="owner == trade.user_2" >
                        You've traded with {{trade.user_1}}
                    </div>
                </div>

                `

})

export class TradeComponent{
    @Input() trade : Trade;
    item1 : Media;
    item2 : Media;
    owner : string;
    detailed : boolean = false;
    constructor(private _mediaService : MediaService, private _tradeService : TradeService, private _router : Router){};

    ngOnInit(){
        this.detailed = false;
        this.owner = userLoggined();
    }

    setDetailed(){
        if(this.detailed==false){
            if(!!this.trade) {
                this._mediaService.getMediaById(this.trade.item_1).subscribe(medias => {
                    this.item1 = medias[0];
                    console.log(this.item1);
                    this._mediaService.getMediaById(this.trade.item_2).subscribe(medias=> {
                        this.item2 = medias[0];
                        console.log(this.item2);
                    })
                });
            }
        }
        this.detailed = !this.detailed;
    }

    confirmTrade(){
       return this._tradeService.confirmTrade(this.trade.Trade_id).subscribe(res =>{
           console.log(res);
           this._router.navigate(['Repository']);
       });
    }
}

