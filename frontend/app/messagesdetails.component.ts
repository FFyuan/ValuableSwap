/**
 * Created by reitersg on 5/18/2016.
 */
import {Component, Input, OnInit, OnChanges, SimpleChange} from 'angular2/core';
import {MessageService} from './messages.service';
import {Message} from './messages';
import {MessageComponent} from './messages.component';
import { RouteParams } from 'angular2/router';
import {userLoggined} from './userLoggined.function';
@Component({

    selector : 'messagedetails',
    template : `<div class="container-fluid" style="float: left; width: 300px">
                <ul *ngIf="message" class ="well" style="list-style-type: none; ">
                    <li class = "list-item">Sender : {{message.sender}}</li>
                    <li class = "list-item">Text: {{message.message_text}}</li>
                    <li class = "list-item">Time:{{message.time}}</li>
                </ul>
                <button class="btn btn-default" (click)="reply()">Reply</button>
                </div>
                `
})

export class MessageDetailComponent {
    message : any;

    constructor(private _routerPara : RouteParams, private _service : MessageService){}
    ngOnInit(){
        let id = +this._routerPara.get('id');
        console.log(id);
        this._service.getSpecificMessage(id).subscribe(message =>{
            console.log(message[0]);
            this.message = message[0];
        });
    }
    
}

