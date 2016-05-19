/**
 *
 * Created by Yuan on 5/19/16.
 */
import {Component, Input, OnInit, OnChanges, SimpleChange} from 'angular2/core';
import {NgIf} from 'angular2/common';
import {Message} from './message';
import {MessageComponent} from './message.component';
import {userLoggined} from './userLoggined.function';
import {MessageService} from './message.service';

@Component({
    selector : 'message-list',
    template : `<div class="container">
                    <div class="row" (click)="onClick()">{{target}}</div>
                    <div *ngIf="showDetail">
                    <div *ngFor = '#message of messages'>
                        <message [message]="message"></message>
                    </div>
                    </div>
                </div>

    `,
    directives : [MessageComponent]
})

export class MessageListComponent{
    @Input() target : string;
    owner : string;
    messages : Message[];
    showDetail : boolean = false;

    constructor(private _messageService : MessageService){}

    onClick(){
        this.showDetail = !this.showDetail;
    }

    ngOnInit(){
        this.owner = userLoggined();
        this.messages = this._messageService.getMessagesfromUsers(this.owner, this.target);
        console.log(this.messages);
    }
}
