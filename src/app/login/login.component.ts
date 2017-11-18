import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  loading = false;
  returnUrl: string;
  currentUser: Object;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    //private alertService: AlertService)
  ){ }

  ngOnInit() {
    //  console.log("inside ngOnInit");
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/login';
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
        data => {
          if(data) {
            this.returnUrl = '/blogs';
            this.router.navigateByUrl(this.returnUrl);
            window.location.reload();
          } else {
            alert("Incorrect Username/Password!");
            window.location.reload();
          }
        },
        error => {
          this.loading = false;
          window.location.reload();
        });
  }
}
