import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {BlogServiceService} from "../blog-service/blog-service.service";


@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements   OnInit {
  model: any = {};
  blogs : Object [];
  currentUser: Object;
  favoriteBlogs: Object[];

  constructor(private request: BlogServiceService) {}
  ngOnInit() {
    this.request.loadData()
      .subscribe((data) => {
        this.blogs = data;
        this.currentUser = JSON.parse(localStorage.currentUser);
        this.favoriteBlogs = this.blogs.filter((blog) => {
          return JSON.parse(localStorage.currentUser).favorites.indexOf(blog['id']) > -1;
        });
      })

  }
  AddBlog() {
    console.log(this.model.Title);
    let blog = {
      Title: this.model.Title,
      body: this.model.body,
      createdBy: this.currentUser['id'],
      createdByName: this.currentUser['username'],
      createdOn: new Date(Date.now()).toDateString(),
      category: this.model.category
    }
    this.request.postData(blog)
      .subscribe(data =>{
        this.blogs.push(data);
      })
  }

}
