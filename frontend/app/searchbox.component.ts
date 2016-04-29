/**
 *
 * Created by Yuan on 4/29/16.
 */

import {Component} from 'angular2/core';

@Component({
    selector : "my-searchbox",
    template : `<div class = "col-md-3"></div>
                <div class="col-md-6">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search for...">
                        <span class="input-group-btn">
                            <button class="btn btn-default" type="button">Go!</button>
                         </span>
                    </div><!-- /input-group -->
                </div><!-- /.col-lg-6 -->
                <div class = "col-md-3"></div>
                `
})

export class SearchboxComponent{

}
