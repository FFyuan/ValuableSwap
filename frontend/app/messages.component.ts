/**
 *
 * Created by Yuan on 5/19/16.
 */

import {Component, OnInit} from 'angular2/core';
import {userLoggined} from './userLoggined.function';
import {MessageService} from './message.service';
import {MessageListComponent} from './messagelist.component';


@Component({
    selector : 'messages',
    directives : [MessageListComponent],
    template : `{{owner}}
                <div class="container">
                    <div  *ngFor = '#target of targets'>
                        <message-list [target]="target"></message-list>
                    </div>
                </div>`
})

export class MessagesComponent{
    owner : string;
    targets : string[];

    constructor(private _massegeService : MessageService){};

    ngOnInit(){
        this.owner = userLoggined();
        this.targets = this._massegeService.getUsersConnectWith(this.owner);
        console.log(this.targets);
    }
}
