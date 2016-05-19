/**
 * Created by reitersg on 5/18/2016.
 */
import {Component, Input} from 'angular2/core';
import {Message} from './messages';
import {Router} from 'angular2/router';
import {FORM_DIRECTIVES, FormBuilder, Validators, ControlGroup, NgIf, AbstractControl} from 'angular2/common';
import {MessageService} from './messages.service'
import {MessageslistComponent} from './messageslist.component'

@Component
({
selector : 'message',
    template : `<div class="container-fluid" style="float: left; width: 300px" (click)="onClick()">
                <ul class ="well" style="list-style-type: none; ">
                    <message-list [ownBy]="receiver"> </message-list>
                </ul>
               <button class="btn btn-default" (click)="newMessage()">New Message</button>
                </div>
                `,
})


export class MessageComponent{
    
    @Input() message : Message;

    form : ControlGroup;
    message_id : AbstractControl;
    sender : AbstractControl;
    receiver : AbstractControl;
    message_text : AbstractControl;
    date : AbstractControl;

    constructor(fb : FormBuilder, private messageService : MessageService, private _router : Router){
        this.form = fb.group({
            message_id : ['', Validators.required],
            sender : ['', Validators.required],
            receiver : ['', Validators.required],
            message_text : ['', Validators.required],
            date : ['']
        });
        this.message_id = this.form.controls['message_id'];
        this.sender = this.form.controls['sender'];
        this.receiver = this.form.controls['receiver'];
        this.message_text = this.form.controls['message_text'];
        this.date = this.form.controls['date'];
    }
    ngOnInit(){
        this.receiver = localStorage.getItem('token');
    }

    onClick(){
        this._router.navigate(['MessageDetails', {id : this.message.message_id}, {user : this.message.receiver}]);
    }
    newMessage(){
        this._router.navigate(['newMessage'])
    }
}