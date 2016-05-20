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

    private Url = 'http://localhost:5000';

    confirmTrade(tradeId : number){
        return this.http.post(this.Url + 'confirmtrade', JSON.stringify({
            tradeId : tradeId
        })).map(res => res.json());
    }
}