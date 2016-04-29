/**
 *
 * Created by Yuan on 4/29/16.
 */

import {Component, Input} from 'angular2/core';
import {Router} from 'angular2/router';

@Component({
    selector : 'my-menu',

    template : `<div class="container-fluid" >
                    <ul class="nav nav-pills nav-stacked" >
                       <li *ngFor="#category of categories"
                           (click)="selectCategory(category)"
                           [class.active]="category == selectedCategory">
                       <a ><h5>{{category}}</h5></a>
                       </li>
                    </ul>
                </div>
    `
})

export class MenuComponent{
    categories : string[] = ["All", "Game", "Music", "Book", "Movie"];
    @Input()
    selectedCategory : string;

    constructor(private _router : Router){};

    selectCategory(selectedCategory : string){
        this.selectedCategory = selectedCategory;
        let link = ['Home', {selectedCategory : selectedCategory}];
        this._router.navigate(link);
    }

}
