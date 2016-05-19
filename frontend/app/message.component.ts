/**
 *
 * Created by Yuan on 5/19/16.
 */
import {Component, Input, OnInit} from 'angular2/core';
import {NgIf} from 'angular2/common';
import {userLoggined} from './userLoggined.function';
import {Message} from './message';


@Component({
    selector: 'message',

    template: `<div *ngIf="message.sender == owner" class="list-group-item" style="background-color: #999">
                    <div class="row">
                        <p class="text-right" style="padding-right: 40px">{{message.message_text}}</p>
                    </div>
               </div>
               <div *ngIf="message.receiver == owner" class="list-group-item" style="background-color: #eee">
                    <div class="row">
                        <p class="text-left" style="padding-left: 20px">{{message.sender}} sends:</p>
                    </div>
                    <div class="row">
                        <p class="text-left" style="padding-left: 40px">{{message.message_text}}</p>
                    </div>
               </div>`
})

export class MessageComponent{
    @Input() message : Message;

    owner : string;

    ngOnInit(){
        this.owner = userLoggined();
        console.log(this.message);
    }
}
