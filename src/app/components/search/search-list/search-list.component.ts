import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})

export class SearchListComponent implements OnInit {
  
  searchStr : string;
  listPeopleSearch: any[];
  listPostSearch : any[];
  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) {
    this.listPeopleSearch = [];
    this.listPostSearch = [];
    this.searchStr = "";
  }

  ngOnInit() {

    this.route.params.subscribe( params => 
      {
        console.log("route post data " + params["searchStr"]);
        this.searchStr = params["searchStr"];
        this.router.navigate(['people',{people : this.searchStr}], {relativeTo: this.route})
      }
    );
  }

follow(id: string) : void {
    this.userService.followUser(id)
      .subscribe((data) => {
         console.log(data);
      });
}

}
