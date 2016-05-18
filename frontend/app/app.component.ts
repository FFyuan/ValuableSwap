import {Component, OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS,Router} from 'angular2/router';
import {HomeComponent} from './home.component';
import {LoginComponent} from './login.component';
import {MediaService} from './media.service';
import {Authentication} from './authentication';
import {userLoggined} from './userLoggined.function';
import {RegisterComponent} from "./register.component";
import {WishlistComponent} from './wishlist.component';
import {RepositoryComponent} from './repository.component';
import {MediaDetailComponent} from './mediadetails.component';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    providers : [ROUTER_PROVIDERS, MediaService, Authentication],
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
    },{
        path : '/mediadetails:id',
        name : 'MediaDetails',
        component : MediaDetailComponent
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
            () => window.location.reload()
        );
    }
}

