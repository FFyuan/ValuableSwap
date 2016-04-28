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

    medias : Media[];

    constructor(private _mediaService : MediaService){};

    getMedias(){
        this._mediaService.getMedias().then(medias => this.medias = medias);
    }

    ngOnInit(){
        this.getMedias();
    }
}
