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

    private mediaUrl = 'http://localhost:5000/';


    getMediasUnderCategory(category : string, keyword : string) : Observable<Media[]>{
        if (keyword === undefined) keyword =  '';
        return this.http.get(this.mediaUrl + 'media')
            .map(res => {
                console.log(res.json());
                return res.json().filter(media => {
                    if(category!='All'){
                        if(!media.category.includes(category)){
                            return false;
                        }else {
                            return media.name.toLowerCase().includes(keyword) || media.genre.toLowerCase().includes(keyword);
                        }
                    }else{
                        return media.category.toLowerCase().includes(keyword) ||
                            media.name.toLowerCase().includes(keyword) ||
                            media.genre.toLowerCase().includes(keyword);
                    }}
                )
            });
    }

    getMediasOwnBy(user : string) : Observable<Media[]>{
        return this.http.get(this.mediaUrl + 'has')
            .map(res => res.json());
    }

    getMediasWantBy(user : string) : Observable<Media[]>{
        return this.http.get(this.mediaUrl + 'want')
            .map(res => res.json());

    }

}
