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
    template : `<div class="well">
                <div class="list-group">
                    <div  *ngFor = '#target of targets'>
                        <message-list [target]="target"></message-list>
                    </div>
                </div>
                </div>`

})

export class MessagesComponent{
    owner : string;
    targets : string[];

    constructor(private _massegeService : MessageService){};

    ngOnInit(){
        this.owner = userLoggined();
        this._massegeService.getUsersConnectWith(this.owner).subscribe(users =>
            this.targets = users
        );
        console.log(this.targets);
    }
}
