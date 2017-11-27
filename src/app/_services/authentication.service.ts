import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

const BASE_URL = 'users/'
const header = {headers: new Headers({'Content-Type': 'application/json'})}


@Injectable()
export class AuthenticationService {
  constructor(private http: Http) { }

  login(username: string, password: string) {
    return this.http.get(BASE_URL)
      .map(res => {
        let userData = res.json();
        var authUser = userData.find((user)=> user.username === username && user.password ===password);

        if(authUser){
          localStorage.setItem('currentUser', JSON.stringify(authUser));
          console.log(authUser);
        }
        return authUser;
      })

  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
