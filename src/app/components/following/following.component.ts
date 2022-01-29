import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})

export class FollowingComponent implements OnInit {
  listFollowing: User[];
  followerCount: number;
  constructor(private userService: UserService, private router: Router) {
    this.listFollowing = [];
    this.followerCount = 0;
  }

  ngOnInit() {
    this.userService.getFollowing()
      .subscribe((data: any) => {
        this.listFollowing = data;
        this.followerCount = this.listFollowing.length;
        localStorage.setItem('followingCount', this.listFollowing.length.toString());
      });
  }

  unFollow(id: string):void {
    this.userService.followUser(id)
      .subscribe((data: any) => {
  
        this.ngOnInit();
        //this.router.navigateByUrl('/following');
      });

     
  }
}
