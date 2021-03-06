import {Component, OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS,Router} from 'angular2/router';
import {HomeComponent} from './home.component';
import {LoginComponent} from './login.component';
import {MediaService} from './media.service';
import {Authentication} from './authentication';
import {MessageService} from './message.service';
import {userLoggined} from './userLoggined.function';
import {RegisterComponent} from "./register.component";
import {WishlistComponent} from './wishlist.component';
import {RepositoryComponent} from './repository.component';
import {MediaDetailComponent} from './mediadetails.component';
import {MessagesComponent} from './messages.component';
import {TradeService} from './trade.service';
import {TradeRequestsComponent} from './traderequests.component';
import {HistoryComponent} from './history';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    providers : [ROUTER_PROVIDERS, MediaService, Authentication, MessageService, TradeService],
    directives : [ROUTER_DIRECTIVES]
})

@RouteConfig([
    {
        path : '/home',
        name : 'Home',
        component : HomeComponent,
        useAsDefault : true
    },{
        path : '/login',
        name : 'Login',
        component : LoginComponent
    },{
        path : '/register',
        name : 'Register',
        component : RegisterComponent
    },{
        path : '/wishlist',
        name : 'Wishlist',
        component : WishlistComponent
    },{
        path : '/repository',
        name : 'Repository',
        component : RepositoryComponent
    },
    {
        path : '/messages',
        name : 'Messages',
        component : MessagesComponent
    },
    {
        path : '/mediadetails/:id',
        name : 'MediaDetails',
        component : MediaDetailComponent
    },
    {
        path : '/traderequests',
        name : 'TradeRequests',
        component : TradeRequestsComponent
    },{
        path : '/history',
        name : 'History',
        component : HistoryComponent
    }
])

export class AppComponent {
    title = 'Valuable Swap';
    user : string = null;
    constructor(private _auth : Authentication, public router : Router){};

    ngOnInit(){
        this.user = userLoggined();
    }

    onSignedOut(){
        console.log("logging out");
        this._auth.logout().subscribe(
            () => {
                this.router.navigate(['Home']);
                window.location.reload()
            }
        );
    }
}

