import { Component, OnInit } from '@angular/core';
import {TweetService} from '../../services/tweet.service';
import {Router} from '@angular/router';
import { Like } from 'src/app/models/like.model';
import { User } from 'src/app/models/user.model';
import { Tweet } from 'src/app/models/tweet.model';
import { EditTweetComponent } from './edit-tweet/edit-tweet.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddTweetComponent } from './add-tweet/add-tweet.component';
@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css'],
  providers: [TweetService]
})
export class PlaygroundComponent implements OnInit {

public display : string = "none";

openModal(): void{
    this.display = "block";
}
  
onCloseHandled(): void {
    this.display = "none";
}

listTweets: any[];

tweetLikes: Like[] = [];

checkId: string = sessionStorage.getItem('currentUserEmail')!;;
  
constructor(private tweetService: TweetService, private router: Router,private modalService: NgbModal) {
     this.listTweets = [];
}

ngOnInit() {
    
    console.log('Current User : ' + sessionStorage.getItem('currentUserEmail'));
    this.tweetService.getTweets()
      .subscribe((data: any) => {
        this.listTweets = data;
        console.log(this.listTweets);
      });

      this.tweetService.getTweetLike().subscribe((data:any)=>{
        this.tweetLikes = data;
        console.log(this.tweetLikes);
      })
}

editItem(id: number, tweetBody: string): void {

  const ref = this.modalService.open(EditTweetComponent, { centered: true });
  
  var tweetModel = new Tweet();
  tweetModel.TweetId = id;
  tweetModel.Message = tweetBody;

  ref.componentInstance.selectedTweet = tweetModel;

  ref.result.then((yes) => {
    console.log("Yes Click");
    this.ngOnInit();
  },
    (cancel) => {
      console.log("Cancel Click");

    })
}

deleteTweet(id: number): void {

  console.log("id here :" + id);
    this.tweetService.deleteTweet(id)
      .subscribe((data) => {
        // console.log(data);
        this.ngOnInit();
      })
}
addTweet(): void {

  const ref = this.modalService.open(AddTweetComponent, { centered: true });

  ref.result.then((yes) => {
    console.log("Yes Click");
    this.ngOnInit();
  },
    (cancel) => {
      console.log("Cancel Click");

    })

}

likeTweet(id: number): void {
  this.tweetService.likeTweet(id)
    .subscribe((data) => {
      console.log(data);
      this.ngOnInit();
    
    });
}

dislikeTweet(id: number): void {
  this.tweetService.dislikeTweet(id)
    .subscribe((data) => {
      this.ngOnInit();
    });
}

Isliked(item : number): boolean{

  

  var FOUND =  this.tweetLikes.find(x => x.TweetId == item && x.UserId == this.checkId );
  if( FOUND !=null){
    if( FOUND.IsLiked == true) return true
  }

  return false;
}

Isdisliked(item : number): boolean{

  var FOUND =  this.tweetLikes.find(x => x.TweetId == item && x.UserId == this.checkId);
   
   
  if( FOUND !=null){
    if( FOUND.IsLiked==false) return true
  }
  
  return false;
}

   
}
