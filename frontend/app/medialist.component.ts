/**
 *
 * Created by Yuan on 4/28/16.
 */

import {Component, Input, OnInit} from 'angular2/core';
import {MediaService} from './media.service';
import {Media} from './media';
import {MediaComponent} from './media.component';

@Component({
    selector : 'media-list',
    template : `<div class="container-fluid">
                    <div *ngFor = '#media of medias'>
                        <media [media]="media"></media>
                    </div>
                </div>
    `,
    directives : [MediaComponent]
})

export class MedialistComponent{
    @Input() category : string;
    @Input() ownBy : string;
    @Input() wantBy : string;

    medias : Media[];

    constructor(private _mediaService : MediaService){};

    getMedias(){
        this._mediaService.getMediasUnderCategory(this.category).subscribe(medias => this.medias = medias);
    }

    getMediasOwnBy(){
        this._mediaService.getMediasOwnBy(this.ownBy).subscribe(medias => this.medias = medias);
    }

    getMediasWantBy(){
        this._mediaService.getMediasWantBy(this.ownBy).subscribe(medias => this.medias = medias);
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
}
