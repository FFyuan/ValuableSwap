/**
 *
 * Created by Yuan on 4/27/16.
 */

import {Component, OnInit} from 'angular2/core';
import {MedialistComponent} from './medialist.component';
import {MenuComponent} from './menu.component';
import {SearchboxComponent} from './searchbox.component';
import {RouteParams} from 'angular2/router';

@Component({
    selector : 'home',

    templateUrl : 'app/home.component.html',
    directives : [MedialistComponent, MenuComponent, SearchboxComponent]
})

export class HomeComponent{
    title = "Welcome to ValuableSwap";

    selectedCategory : string = "All";

    constructor(private _routeParams : RouteParams){}
    ngOnInit(){
        this.selectedCategory = this._routeParams.get('selectedCategory');
        if(!this.selectedCategory) this.selectedCategory = "All";
    }
}
