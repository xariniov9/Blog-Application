import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "Himanshu's Blogger";
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ){ }
  renderForm() {
    this.router.navigateByUrl('/login');
  }
}
