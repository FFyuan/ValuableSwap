/**
 *
 * Created by Yuan on 4/28/16.
 */
import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Media} from './media';

@Injectable()
export class MediaService{
    constructor(private http: Http){}

    private mediaUrl = 'http://localhost:5000/media';


    getMediasUnderCategory(category : string) : Observable<Media[]>{
        return this.http.get(this.mediaUrl)
            .map(res => res.json().filter(media => {
                if(category!='All'){
                    return media.category.includes(category);
                }else{
                    return true;
                }}
            ));
    }

    private extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        console.log(body);
        var result = body;
        console.log(result);
        return result || { };
    }

}
