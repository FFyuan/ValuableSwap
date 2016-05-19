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

    getUsersConnectWith(user : string) : Observable<string[]>{
        return this.http.post(this.messageUrl + 'userconnections', JSON.stringify({
            user : user
        })).map(res => res.json());
    }

    getMessagesfromUsers(user1 : string, user2 : string) : Observable<Message[]>{
        return this.http.post(this.messageUrl + 'messages', JSON.stringify({
            user1: user1,
            user2: user2
        })).map(res => res.json());
    }

    sendMessage(sender : string, receiver : string, text : string) {
        return this.http.post(this.messageUrl+'sendmessage', JSON.stringify({
            sender : sender,
            receiver : receiver,
            text : text
        })).map(res => res.json());

    }

}