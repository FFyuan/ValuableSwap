/**
 * Created by reitersg on 5/18/2016.
 */
import {Component, Input} from 'angular2/core';
import {Message} from './messages';
import {Router} from 'angular2/router';

@Component
({
selector : 'message',
    template : `<div class="container-fluid" style="float: left; width: 300px" (click)="onClick()">
                <ul class ="well" style="list-style-type: none; ">
                    <li class = "list-item">Sender: {{message.sender}}</li>
                </ul>
               <button class="btn btn-default" (click)="newMessage()">New Message</button>
                </div>
                `,
})


export class MessageComponent{
    
    @Input() message : Message;

    constructor(private _router : Router){

    }
    onClick(){
        this._router.navigate(['MessageDetails', {id : this.message.message_id}, {user : this.message.receiver}]);
    }
    newMessage(){
        this._router.navigate(['newMessage'])
    }
}