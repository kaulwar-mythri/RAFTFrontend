import { Component, Input } from '@angular/core';

import { DataService } from './services/data.service';
import { NavigationEnd, Router } from '@angular/router';


interface SideNavToggle{
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'RaftFrontEndAngular';
  isSideNavCollapsed = false;
  screenWidth = 0;

  constructor(public _dataService: DataService, private router: Router){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd){
        if (event.url === '/' || event.url === '/requestAccess') {
          _dataService.canAccessMainComponents = false
        } else {
          _dataService.canAccessMainComponents = true;
        }
      }
    })
  }

  onToggleSideNav(data: SideNavToggle): void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed
  }

  isAuthenticated():boolean{
    return localStorage.getItem("auth_token") !==null;
  }
}
