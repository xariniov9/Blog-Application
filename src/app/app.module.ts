import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from "./_services/authentication.service";
import { BlogServiceService} from "./blog-service/blog-service.service";
import {HttpModule} from "@angular/http";
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { BlogGuardService} from './blog-guard.service';

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'blogs', component: BlogListComponent},
  { path: 'blogs/:id',
    canActivate: [ BlogGuardService ],
    component: BlogDetailComponent}

];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BlogListComponent,
    BlogDetailComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [AuthenticationService, BlogServiceService, BlogGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
