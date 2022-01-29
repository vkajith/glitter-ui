import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tweet } from 'src/app/models/tweet.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.css']
})
export class PostlistComponent implements OnInit {


  searchString : string;
  listPostSearch : Tweet[];
  constructor(private route: ActivatedRoute,private userService: UserService) {
    this.listPostSearch = [];
    this.searchString = "";
      
  }

  ngOnInit(): void {

    this.route.params.subscribe( params => 
      {
        
         this.searchString = params["posts"];
        
         if(this.searchString!=""){
          this.userService.searchPost(this.searchString)
          .subscribe((data: any) => {
            this.listPostSearch = data;
         
          });
        } 
      }
    );
  }

 
isEmptyData(): boolean{
  if(this.listPostSearch.length == 0) return true;

  else  return false;
}

}
