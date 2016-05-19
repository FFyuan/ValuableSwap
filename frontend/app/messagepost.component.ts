/**
 * Created by Yuan on 5/19/16.
 */
import {Component, OnInit, Input} from 'angular2/core';
import {FORM_DIRECTIVES, FormBuilder, Validators, ControlGroup, NgIf} from 'angular2/common';
import {MessageService} from './message.service';


@Component({
    selector : 'message-post',
    directives : [FORM_DIRECTIVES, NgIf],
    template: `<form class="form-horizontal" role="form" [ngFormModel]="form" (submit)="onSubmit(form.value)">
                        <div class="form-group">
                            <label for="text" class="control-label col-md-3">Send message to {{target}}: </label>
                            <div class="col-md-9">
                                <input type="text" class="form-control" ngControl="message_text">
                            </div>
                        </div>
                        <div class="form-group">
                            <div style="float: right; padding-right: 20px">
                                <button type="submit" class="btn btn-default" [disabled]="!form.valid">Send the Message</button>
                            </div>
                        </div>
                    </form>`
})


export class MessagePostComponent{
    @Input() target : string;
    @Input() owner : string;

    form : ControlGroup;

    constructor(fb: FormBuilder, private _messageService : MessageService){
        this.form = fb.group({
            message_text : ['', Validators.required]
        });
    }

    onSubmit(value : any){
        console.log(value);
        this._messageService.sendMessage(this.owner, this.target, value.message_text).subscribe(
            (result : any) => {
                console.log(result);
            }
        );
    }
}
