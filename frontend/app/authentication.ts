/**
 *
 * Created by Yuan on 5/12/16.
 */
import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Http, Headers} from 'angular2/http';

@Injectable()
export class Authentication {
    token: string;
    serverUrl = 'http://localhost:5000/auth';
    constructor(private http: Http) {
        this.token = localStorage.getItem('token');
    }

    login(username: String, password: String) {
         return this.http.post(this.serverUrl+ '/login', JSON.stringify({
            username: username,
            password: password
         }), {
         headers: new Headers({
         'Content-Type': 'application/json'
         })
         }).map((res : any) => {
            let data = res.json();
            this.token = data.token;
            localStorage.setItem('token', this.token);
            console.log(this.token);
         });
    }

    logout() {
        this.token = undefined;
        localStorage.removeItem('token');
        return Observable.of(true);
    }

    register(UserName: String, Name: String, Email: String, Password: String) {
        return this.http.post(this.serverUrl + '/register', JSON.stringify({
            UserName: UserName,
            Name: Name,
            Email: Email,
            Password: Password
        }), {
            headers: new Headers({'Content-Type': 'application/json'})
        }).map((res: any)=> {
            return res.json();
        });
    }


}
