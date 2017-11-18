import { Component} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "Himanshu's Blogger";
  IsHidden = false;
  currentUser: Object;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(this.currentUser)
      this.IsHidden = true;
    else this.IsHidden = false;
  }
  renderForm() {
    this.IsHidden = true;
    this.router.navigateByUrl('/login');
  }
  logOut() {
    this.IsHidden = false;
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    window.location.reload();
  }
}
