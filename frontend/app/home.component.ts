/**
 *
 * Created by Yuan on 4/27/16.
 */

import {Component} from 'angular2/core';
import {MedialistComponent} from './medialist.component';

@Component({
    selector : 'home',

    templateUrl : 'app/home.component.html',
    directives : [MedialistComponent]
})

export class HomeComponent{
    title = "Welcome to ValuableSwap";
}
