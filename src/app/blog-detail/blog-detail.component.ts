import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogServiceService} from '../blog-service/blog-service.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  blog: Object;
  currentUser: Object;
  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private request: BlogServiceService) {
    const id = +this._route.snapshot.paramMap.get('id');
    this.request.getBlog(id)
      .subscribe((data) => {
        this.blog = data;
      });
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
  Delete() {
    if (confirm('Are you sure to delete?')) {
      this.request.deleteData(this.blog)
        .subscribe((data) => {
          console.log('blog deleted!');
          this._router.navigate(['/blogs']);
        });
    }
  }
  Edit() {
    console.log('Edit Clicked!');
  }
  ngOnInit() {
  }


}
