import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { Like } from '../models/like.model';
//import 'rxjs/add/operator/map';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})


export class TweetService {
  BASE_URL = 'https://localhost:44385/api';
  constructor(private http: HttpClient, private router: Router) {}
  getTweets() {
    return this.http.get(this.BASE_URL + '/Account/getAllTweet?email='+ sessionStorage.getItem('currentUserEmail')!);
  }
  postTweet(tweetBody: string) {
    return this.http.post(this.BASE_URL + '/Account/addTweet/', {UserId : sessionStorage.getItem('currentUserEmail')!, Message: tweetBody});
  }
  editTweet(tweetBody: string, id: number) {
    return this.http.post(this.BASE_URL + '/Account/editTweet/' , { Message: tweetBody,TweetId : id});
  }
  deleteTweet(id: number) {
    return this.http.post(this.BASE_URL + '/Account/deleteTweet', {TweetId : id});
  }
  likeTweet(id: number) {
    return this.http.post(this.BASE_URL + '/Account/likeTweet', {UserId : sessionStorage.getItem('currentUserEmail')!, TweetId:id});
  }
  dislikeTweet(id: number) {
    return this.http.post(this.BASE_URL + '/Account/dislikeTweet', {UserId : sessionStorage.getItem('currentUserEmail')!, TweetId:id});
  }
  getTweetLike(){
    return this.http.get(this.BASE_URL + '/Tweet/likes');
  }
}
