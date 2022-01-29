import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-peoplelist',
  templateUrl: './peoplelist.component.html',
  styleUrls: ['./peoplelist.component.css']
})
export class PeoplelistComponent implements OnInit {

  listPeopleSearch: User[];
  searchString : string ;
  followeeList: User[];
  


  constructor(private route: ActivatedRoute,private userService: UserService) {
    this.listPeopleSearch = [];
    this.searchString  = "";
    this.followeeList = [];
   }

  ngOnInit(): void {

    
    this.route.params.subscribe( params => 
      {
        console.log("route post data " + params["people"]);
         this.searchString = params["people"];


         
      //getfollowee
      this.userService.getFollowing().subscribe((data:any)=>{this.followeeList = data});


         if(this.searchString!=""){
          this.userService.searchPeople(this.searchString)
          .subscribe((data: any) => {
            this.listPeopleSearch = data;
            console.log(this.listPeopleSearch);
          });
        } 
        
      }
    );
  
  }
  follow(id: string) : void {
    console.log(id);
    this.userService.followUser(id)
      .subscribe((data) => {
         console.log(data);
         this.ngOnInit();
      });
}

  isFolloweeContains(id:string): boolean{

    var FOUND =  this.followeeList.find(x => x.EmailId == id );

    if(FOUND!=null) return true;

    else return false;
  }

  isEmptyData(): boolean{
    if(this.listPeopleSearch.length == 0) return true;

    else  return false;
  }

  samePerson(id: string): boolean{
    if(id==sessionStorage.getItem('currentUserEmail')) return true;

    return false;
  }
}
