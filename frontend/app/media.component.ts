/**
 *
 * Created by Yuan on 4/28/16.
 */

import {Component, Input} from 'angular2/core';
import {Media} from './media';

@Component({
    selector : 'media',
    template : `<div class="container-fluid" style="float: left; width: 20%">
                <ul class ="well" style="list-style-type: none; ">
                    <li class="list-item"><img src="http://www.hdums.com/img/swap.png" class="img-rounded" style="width: 100%"> </li>
                    <li class = "list-item">Category: {{media.category}}</li>
                    <li class = "list-item">Genre:{{media.genre}}</li>
                    <li class = "list-item">condition:{{media.condition}}</li>
                    <li class = "list-item">Name:{{media.name}}</li>
                </ul>
                </div>
                `,
})

export class MediaComponent{
    @Input() media : Media;
}
