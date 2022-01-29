import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [UserService]
})
export class NavbarComponent implements OnInit {
followingCount: number = 0;
followersCount: number = 0;
  constructor(private userService: UserService, private router: Router) {

  }

  ngOnInit() {
    this.userService.getFollowing()
    .subscribe((data: any) => {
      this.followingCount = data.length;
      
    });

    this.userService.getFollowers()
    .subscribe((data: any) => {
      this.followersCount = data.length;
      
    });

    console.log(this.followersCount,this.followingCount);
  }
  logout():void {
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }

}
