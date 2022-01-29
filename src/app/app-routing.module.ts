import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { FollowersComponent } from './components/followers/followers.component';
import { FollowingComponent } from './components/following/following.component';
import { LoginComponent } from './components/login/login.component';
import { PlaygroundComponent } from './components/playground/playground.component';
import { RegisterComponent } from './components/register/register.component';
import { PeoplelistComponent } from './components/search/peoplelist/peoplelist.component';
import { PostlistComponent } from './components/search/postlist/postlist.component';
import { SearchListComponent } from './components/search/search-list/search-list.component';
import { SearchComponent } from './components/search/search.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'playground', component: PlaygroundComponent,canActivate: [AuthGuard]},
  {path: 'followers', component: FollowersComponent,canActivate: [AuthGuard]},
  {path: 'following', component: FollowingComponent,canActivate: [AuthGuard]},
  {path: 'search', component: SearchComponent,
  children : [ {path: 'searchlist', component : SearchListComponent,
  children: [
    {
      path:'people', component: PeoplelistComponent 
    },
    {
      path:'posts', component: PostlistComponent
    }
  ],}],
  canActivate: [AuthGuard]
  },
  {path: 'analytics', component: AnalyticsComponent,canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
