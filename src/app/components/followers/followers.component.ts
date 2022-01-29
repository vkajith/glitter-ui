import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {

listFollowers: string[];
  constructor(private userService: UserService, private router: Router) {
    this.listFollowers = [];
  }

  ngOnInit() {
    this.userService.getFollowers()
      .subscribe((data: any) => {
        this.listFollowers = data;
        console.log(data);
        localStorage.setItem('followerCount', this.listFollowers.length.toString());
      });
  }

}