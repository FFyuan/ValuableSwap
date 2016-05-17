/**
 *
 * Created by Yuan on 4/27/16.
 */

import {Component, OnInit} from 'angular2/core';
import {NgModel} from 'angular2/common';
import {MedialistComponent} from './medialist.component';
import {MenuComponent} from './menu.component';
import {RouteParams} from 'angular2/router';
import {Http} from 'angular2/http';

@Component({
    selector : 'home',

    templateUrl : 'app/home.component.html',
    directives : [MedialistComponent, MenuComponent, NgModel]
})

export class HomeComponent{
    title = "Welcome to ValuableSwap";

    selectedCategory : string = "All";
    keyword : string;

    constructor(private _routeParams : RouteParams){}
    ngOnInit(){
        this.selectedCategory = this._routeParams.get('selectedCategory');
        if(!this.selectedCategory) this.selectedCategory = "All";
    }

}
