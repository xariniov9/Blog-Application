import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map'

const BASE_URL = 'http://blog-app-db.herokuapp.com/blogs/';
const BASE_USER_URL = 'http://blog-app-db.herokuapp.com/users/';
const header = {headers: new Headers({'Content-Type': 'application/json'})}

@Injectable()
export class BlogServiceService {

  constructor(private http: Http) { }

  loadData() {

    return this.http.get(BASE_URL)
      .map(res => res.json())
  }

  getBlog(id){
    return this.http.get(BASE_URL + id.toString())
      .map(res => res.json());
  }
  postData(data) {
    return this.http.post(BASE_URL, data, header)
      .map(res => res.json())

  }

  updateData(data) {
    return this.http.patch(`BASE_URL${data.id}`,data, header)
      .map(res => res.json());
  }

  updateFavorites(data) {
    const fullURL = BASE_USER_URL + `${data.id}`
    return this.http.put(fullURL, data, header)
      .map(res => res.json());
  }

  deleteData(data) {
      const deleteURL = BASE_URL + `${data.id}`;
      return this.http.delete(deleteURL)
        .map(res => res.json());
  }
  checkData(data) {
    return data.id?this.updateData(data): this.postData(data)
      .map(res => res.json())
  }

}