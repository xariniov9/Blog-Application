import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {BlogServiceService} from '../blog-service/blog-service.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements   OnInit {
  model: any = {};
  blogs: Object [];
  currentUser: Object;
  favoriteBlogs: Object[];
  filteredBlogs: Object [];
  _listFilter: string;
  public options: Object = {
    charCounterCount: true,
    height: 300,
    events : {
      'froalaEditor.focus' : function(e, editor) {
        console.log(editor.selection.get());
      }
    }
  };
  constructor(private request: BlogServiceService) {}
  ngOnInit() {
    this.request.loadData()
      .subscribe((data) => {
        this.blogs = data;
        this.filteredBlogs = this.blogs;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.favoriteBlogs = this.blogs.filter((blog) => {
          return this.currentUser['favorites'].indexOf(blog['id']) > -1;
        });
      });
  }

  AddBlog() {
    console.log(this.model.Title);
    const blog = {
      Title: this.model.Title,
      body: this.model.body,
      createdBy: this.currentUser['id'],
      createdByName: this.currentUser['username'],
      createdOn: new Date(Date.now()).toDateString(),
      category: this.model.category
    };
    if (this.model.Title == null || this.model.Title.trim() === ''){
      alert('Title cannot be empty!');
      return;
    }
    if (this.model.category == null || this.model.category.trim() === ''){
      alert('Category cannot be empty!');
      return;
    }
    this.request.postData(blog)
      .subscribe(data => {
        this.blogs.push(data);
      });
  }

  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredBlogs = this.listFilter ? this.performFilter(this.listFilter) : this.blogs;
  }

  performFilter(filterBy: string): Object[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.blogs.filter((blog: Object) =>
      blog['Title'].toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

}
