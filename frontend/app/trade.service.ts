/**
 *
 * Created by Yuan on 5/19/16.
 */


import {Injectable} from 'angular2/core';
import {Http, Response, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Media} from './media';

@Injectable()
export class TradeService{
    constructor(private http: Http){}

    private Url = 'http://localhost:5000/';

    confirmTrade(tradeId : number){
        return this.http.post(this.Url + 'confirmtrade', JSON.stringify({
            tradeId : tradeId
        })).map(res => res.json());
    }

    requestTrade(user1 : string, user2 : string, item1 : number, item2 : number){
        return this.http.post(this.Url + 'requesttrade', JSON.stringify({
            user1 : user1,
            user2 : user2,
            item_1 : item1,
            item_2 : item2
        })).map(res => res.json());
    }

    getTradePending(user : string){
        return this.http.post(this.Url + 'tradepending', JSON.stringify({
            user : user
        })).map(res => res.json());
    }

    getTradeHistory(user : string){
        return this.http.post(this.Url + 'tradehistory', JSON.stringify({
            user : user
        })).map(res => res.json());
    }
}