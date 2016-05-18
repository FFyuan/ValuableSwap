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

    constructor(private _mediaService : MediaService){};

    getMedias(){
        this._mediaService.getMediasUnderCategory(this.category, this.keyword).subscribe(medias => this.medias = medias);
    }

    getMediasOwnBy(){
        this._mediaService.getMediasOwnBy(this.ownBy).subscribe(medias => this.medias = medias);
    }

    getMediasWantBy(){
        this._mediaService.getMediasWantBy(this.wantBy).subscribe(medias => this.medias = medias);
    }

    ngOnInit(){
        if(!this.ownBy && !this.wantBy) {
            this.getMedias();
        }else
        if(this.ownBy){
            this.getMediasOwnBy();
        }else{
            this.getMediasWantBy();
        }
    }

    ngOnChanges(changes: {[propKey:string]: SimpleChange}){
        if(changes['keyword']) {
            let key = changes['keyword'].currentValue;
            this.getMedias();
        }
    }
}
