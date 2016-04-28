import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {HomeComponent} from './home.component';
import {MediaService} from './media.service';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    providers : [ROUTER_PROVIDERS, MediaService],
    directives : [ROUTER_DIRECTIVES]
})

@RouteConfig([
    {
        path : '/home',
        name : 'Home',
        component : HomeComponent,
        useAsDefault : true
    }
])

export class AppComponent {
    title = 'Valuable Swap';


}

