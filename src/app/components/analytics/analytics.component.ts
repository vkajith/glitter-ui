import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tweet } from 'src/app/models/tweet.model';
import { User } from 'src/app/models/user.model';
import { AnalyticsService } from 'src/app/services/analytics.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  trendyTag : string = "";
  totalTweets : number = 0;
  mostTweetPerson: User;
  mostLikedTweet: Tweet;
  constructor(private service : AnalyticsService, private router: Router) { 

    this.mostTweetPerson = new User();
    this.mostLikedTweet = new Tweet();

  }

  ngOnInit(): void {

    this.getAnalytics();

  }
  getAnalytics(){

    //Hashtag
    this.service.getTrendingHashTag()
    .subscribe((data: any) => {
      this.trendyTag = data;
    
    });

    //Most-Tweets
    this.service.getMostTweetPerson().subscribe((data:any)=>{
      this.mostTweetPerson = data;
      
    })

    //Total Tweets

    this.service.getTotalTweets().
    subscribe((data:any)=>{
      this.totalTweets = data;
      
    })

    //Most-liked tweet

    this.service.getMostLikedTweet().
    subscribe((data:any)=>{
      this.mostLikedTweet = data;
      
    })
  }
}
