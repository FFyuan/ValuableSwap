/**
 *
 * Created by Yuan on 4/28/16.
 */
import {Injectable} from 'angular2/core';
import {Http, Response, Headers} from 'angular2/http';
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
                    if (category != 'All') {
                        if (!media.category.includes(category)) {
                            return false;
                        } else {
                            return media.name.toLowerCase().includes(keyword) || media.genre.toLowerCase().includes(keyword);
                        }
                    } else {
                        let check = false;
                        if(media.category) check = check || media.category.toLowerCase().includes(keyword);
                        if(media.name) check = check || media.name.toLowerCase().includes(keyword);
                        if(media.genre) check = check || media.genre.toLowerCase().includes(keyword);
                        if(media.author) check = check || media.author.toLowerCase().includes(keyword);
                        if(media.music_type) check = check || media.music_type.toLowerCase().includes(keyword);
                        return check;
                    };
                });
            });
    }

    getMediasOwnBy(user : string) : Observable<Media[]>{
        return this.http.post(this.mediaUrl + 'has', JSON.stringify(
            { user : user}))
            .map(res => res.json());
    }

    getMediasWantBy(user : string) : Observable<Media[]>{
        return this.http.post(this.mediaUrl + 'want', JSON.stringify({
            user : user}))
            .map(res => res.json());

    }

    getMediaById(id: number) : Observable<Media[]>{
        return this.http.post(this.mediaUrl + 'id', JSON.stringify({
            id : id
        }))
            .map(res => res.json());
    }

    postMedia(value: any, category: string, user: string) {
        return this.http.post(this.mediaUrl + 'post', JSON.stringify({
            UserName : user,
            Name : value.name,
            Genre : value.genre,
            Artist : value.author,
            Music_Type : value.system,
            Condition : value.condition,
            System : value.system,
            Type_of_Media : category
        }), {
            headers: new Headers({'Content-Type' : 'application/json'})
        }).map(res => {
            console.log(res);
            return res.json();
        })
    }

    addWishlist(media : Media, username : string){
        return this.http.post(this.mediaUrl + 'addWishlist', JSON.stringify({
            UserName : username,
            Media_Id : media.Media_id
        }),{
            headers: new Headers({
                'Content-Type' : 'application/json'
            })}).map(res => {
                console.log(res);
                return res.json();
            })
    }
 
    
    
    
}
