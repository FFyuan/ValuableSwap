/**
 *
 * Created by Yuan on 5/14/16.
 */
import {Component} from 'angular2/core';

@Component({
    selector : 'wishlist',

    template : `
                <div class="well">
                    <h3>{title}</h3>

                </div>

    `,

    directives : []
})

export class WishlistComponent{
    title = "My Wishlist";
}