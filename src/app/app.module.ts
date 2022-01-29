import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FollowersComponent } from './components/followers/followers.component';
import { LoginComponent } from './components/login/login.component';
import { FollowingComponent } from './components/following/following.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PlaygroundComponent } from './components/playground/playground.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchComponent } from './components/search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { PeoplelistComponent } from './components/search/peoplelist/peoplelist.component';
import { PostlistComponent } from './components/search/postlist/postlist.component';
import { SearchListComponent } from './components/search/search-list/search-list.component';
import { EditTweetComponent } from './components/playground/edit-tweet/edit-tweet.component';
import { AddTweetComponent } from './components/playground/add-tweet/add-tweet.component';

@NgModule({
  declarations: [
    AppComponent,
    FollowersComponent,
    LoginComponent,
    FollowingComponent,
    NavbarComponent,
    PlaygroundComponent,
    RegisterComponent,
    SearchComponent,
    AnalyticsComponent,
    PeoplelistComponent,
    PostlistComponent,
    SearchListComponent,
    EditTweetComponent,
    AddTweetComponent
  ],
  imports: [
    ReactiveFormsModule,
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
