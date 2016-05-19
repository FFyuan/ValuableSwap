/**
 * Created by Yuan on 5/19/16.
 */
import {Injectable} from 'angular2/core';
import {Http, Response, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Message} from './message';

@Injectable()
export class MessageService{
    constructor(private http: Http){}

    private messageUrl = 'http://localhost:5000/';

    getUsersConnectWith(user : string){
        return ['abc','cde'];
    }

    getMessagesfromUsers(user1 : string, user2 : string){
        return [{
            sender : 'adsf',
            receiver : 'test',
            message_text : 'test_message',
            time : undefined
        },{
            sender : 'test',
            receiver : 'adsf',
            message_text : 'test_message_test',
            time : undefined
        },{
            sender : 'adsf',
            receiver : 'test',
            message_text : 'message_test',
            time : undefined
        }];
    }

}