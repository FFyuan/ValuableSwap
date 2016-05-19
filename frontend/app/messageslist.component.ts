/**
 * Created by reitersg on 5/18/2016.
 */
/**
 *
 * Created by Yuan on 4/28/16.
 */

import {Component, Input, OnInit, OnChanges, SimpleChange} from 'angular2/core';
import {MessageService} from './messages.service';
import {Message} from './messages';
import {MessageComponent} from './messages.component';

@Component({
    selector : 'message-list',
    template : `<div class="container-fluid">
                    <div *ngFor = '#message of messages'>
                        <message [message]="message"></message>
                    </div>
                </div>
    `,
    directives : [MessageComponent]
})

export class MessageslistComponent{
    @Input() message_id : number;
    @Input() receiver : string;
    @Input() text : string;
    @Input() keyword : string;

    messages : Message[];

    constructor(private _messageService : MessageService){};


    getMessagesOwnBy(){
        this._messageService.getMessagesOwnBy(this.receiver).subscribe(messages => this.messages = messages);
    }
    

    ngOnInit(){
   
        this.getMessagesOwnBy();
      
    }

    ngOnChanges(changes: {[propKey:string]: SimpleChange}){
        if(changes['keyword']) {
            let key = changes['keyword'].currentValue;
            this.getMessagesOwnBy();
        }
    }
}
