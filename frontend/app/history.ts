/**
 * Created by Yuan on 5/20/16.
 */
import {Component, OnInit} from 'angular2/core';
import {userLoggined} from './userLoggined.function';
import {Trade} from './trade';
import {TradeService} from './trade.service';
import {TradeComponent} from './trade.component';

@Component({
    selector : 'history',
    directives : [TradeComponent],
    template : `<div class="well">
                <div class="list-group">
                    <div *ngFor = '#trade of trades' class="list-group">
                    <trade [trade]="trade" > </trade>
                    </div>
                </div>
                </div>`
})

export class HistoryComponent{
    owner : string;
    trades : Trade[];

    constructor(private _tradeService : TradeService){};

    ngOnInit(){
        this.owner = userLoggined();
        this._tradeService.getTradeHistory(this.owner).subscribe(trades =>
            this.trades = trades
        )
    }
}