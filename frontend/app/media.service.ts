/**
 *
 * Created by Yuan on 4/28/16.
 */
import {Injectable} from 'angular2/core';
import {Media} from './media';
import {MEDIAS} from './mock-medias';

@Injectable()
export class MediaService{
    getMedias(){
        return Promise.resolve(MEDIAS);
    }
    getMediasUnderCategory(category : string){
        return Promise.resolve(MEDIAS).then(
            medias => medias.filter(media => media.category === category || category === "All")
        )
    }
}

