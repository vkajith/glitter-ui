import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  BASE_URL = 'https://localhost:44385/api/Analytics/';

  constructor(private http: HttpClient, private router: Router) {
  }

  getTrendingHashTag(): Observable<string> {
    return this.http.get<string>(this.BASE_URL + 'trendytag/');
  }

  getTotalTweets(): Observable<number>{
    return this.http.get<number>(this.BASE_URL + 'totaltweet/');
  }

  getMostTweetPerson(): Observable<User>{
    return this.http.get<User>(this.BASE_URL + 'maxtweet/');
  }

  getMostLikedTweet(): Observable<string>{
    return this.http.get<string>(this.BASE_URL + 'mostliked/');
  }
  
}
