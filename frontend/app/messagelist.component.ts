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
import {MessagePostComponent} from './messagepost.component';

@Component({
    selector : 'message-list',
    template : `<li class="list-group-item" (click)="onClick()">
                    Conversation with {{target}}
                </li>
                <li class="list-group-item" *ngIf="showDetail">
                    <div *ngFor = '#message of messages'>
                        <message [message]="message"></message>
                    </div>
                    <message-post [target]="target" [owner]="owner"></message-post>
                </li>

    `,
    directives : [MessageComponent, MessagePostComponent]
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
        this._messageService.getMessagesfromUsers(this.owner, this.target).subscribe(messages => {
            this.messages = messages;
            this.messages.sort((m1, m2)=> {
                    if(m1.time > m2.time){
                        return 1;
                    }else{
                        return 0;
                    }
                });
        });
        console.log(this.messages);
    }
}
