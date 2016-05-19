/**
 * Created by reitersg on 5/18/2016.
 */
import {Message} from './messages';
import {Injectable} from 'angular2/core';
import {Http, Response, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Media} from './media';
import {userLoggined} from './userLoggined.function'

@Injectable()
export class MessageService {
    constructor(private http: Http){}

    private messageUrl = 'http://localhost:5000/';


    getMessagesReceivedBy(user : string) : Observable<Message[]>{
        return this.http.post(this.messageUrl + 'MessagesReceivedBy', JSON.stringify(
            { user : user}))
            .map(res => res.json());
    }
    getSpecificMessage(message_id : number) : Observable<Message[]>{
        return this.http.post(this.messageUrl + 'SpecificMessage', JSON.stringify({
            message_id : message_id
        })).map(res => res.json());
    }
    sendTradeRequest(media : Media, username : string){
        return this.http.post(this.messageUrl + 'sendTradeRequest', JSON.stringify({
            UserName : username,
            UserName1 : username
        }), {
            headers : new Headers({
                'Content-Type' : 'application/json'
            })}).map(res => {console.log(res);
            return res.json();
        })
    }
    tradeItem(item1 : Media, item2 : Media, user1 : string, user2 : string) {
        return this.http.post(this.messageUrl + 'tradeItem', JSON.stringify({
            User1 : user1,
            User2 : user2,
            item1 : item1,
            item2 : item2
        }), {
            headers : new Headers ({
                'Content-Type' : 'application/json'
            })}).map(res => {
            console.log(res);
            return res.json();
        })
    }
    
    
    
    
}