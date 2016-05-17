/**
 *
 * Created by Yuan on 5/16/16.
 */
import {Component, OnInit} from 'angular2/core';
import {MedialistComponent} from './medialist.component';

@Component({
    selector : 'repository',

    template : `
                <div class="well">
                    <h3>{{title}}</h3>
                    <media-list [ownBy]="user"> </media-list>
                </div>

    `,

    directives : [MedialistComponent]
})

export class RepositoryComponent{
    user : string;
    title = "My Items";

    ngOnInit(){
        this.user = localStorage.getItem('token');
    }
}
