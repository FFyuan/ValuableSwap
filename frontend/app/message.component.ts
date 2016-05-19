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

    template: `<div *ngIf="message.sender == owner" class="row" style="background-color: #999">
                    <div class="row">
                        <p class="text-right">{{message.message_text}}</p>
                    </div>
               </div>
               <div *ngIf="message.receiver == owner" class="row" style="background-color: #eee">
                    <div class="row">
                        <p class="text-left">{{message.sender}} sends:</p>
                    </div>
                    <div class="row">
                        <p class="text-left">{{message.message_text}}</p>
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
