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

//wysiwyg editor
import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';

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
    BlogDetailComponent,
    SafeHtmlPipe
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserModule,
    HttpModule,
    FormsModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],
  providers: [AuthenticationService, BlogServiceService, BlogGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
