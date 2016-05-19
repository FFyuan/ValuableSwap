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
                </div>
                `,
})


export class MessageComponent{
    
    @Input() message : Message;

    constructor(private _router : Router){

    }
    onClick(){
        
    }
}