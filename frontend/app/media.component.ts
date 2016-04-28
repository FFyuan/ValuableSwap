/**
 *
 * Created by Yuan on 4/28/16.
 */

import {Component, Input} from 'angular2/core';
import {Media} from './media';

@Component({
    selector : 'media',
    template : `<div class="container" style="float : left; width : 25%;">
                <ul class ="list-group" style="list-style-type: none; background-color: white;">
                    <li class="list-item"><img src="http://www.computerhope.com/jargon/s/swap-file.jpg" style="width: 100%"> </li>
                    <li class = "list-item">Category: {{media.category}}</li>
                    <li class = "list-item">Genre:{{media.genre}}</li>
                    <li class = "list-item">condition:{{media.condition}}</li>
                </ul>
                </div>
                `
})

export class MediaComponent{
    @Input() media : Media;
}
