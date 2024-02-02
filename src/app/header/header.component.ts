import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, HostListener, Input, NgZone, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'], // Fix the typo in 'styleUrl' to 'styleUrls'
})
export class HeaderComponent implements OnInit {
  @Input() collapsed = false;
  @Input() screenWidth = 0;

  canShowSearchAsOverlay = false;

  switchTheme = new FormControl(false)
  @HostBinding('class') className = '';
  darkClass = 'theme-dark';
  lightClass = 'theme-light';

  // Add the new variable pageName
  pageName: string = '';
  pathWords: any;

  constructor(
    public _dataService: DataService,
    public overlay: OverlayContainer,
    private router: Router,
    private route: ActivatedRoute, // Import ActivatedRoute
    private _ngZone: NgZone,
    private service: AuthService
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkCanShowSearchAsOverlay(window.innerWidth);
  }

  ngOnInit(): void {
    // Set the initial value for pageName based on the current URL path
    this.pageName = this.router.url;
    this.pathWords = this.pageName.split('/').filter(word => word !== '');

    this.checkCanShowSearchAsOverlay(window.innerWidth);

    this.switchTheme.valueChanges.subscribe((currentMode) => {
      this.className = currentMode ? this.lightClass : this.darkClass;

      if (currentMode) {
        this.overlay.getContainerElement().classList.add(this.darkClass)
      } else {
        this.overlay.getContainerElement().classList.remove(this.darkClass)
      }
    });

    // Update pageName whenever the route changes
    this.router.events.subscribe(() => {
      this.pageName = this.router.url;
      this.pathWords = this.pageName.split('/').filter(word => word !== '');
    });
  }

  logout() {
    console.log("logout clicked");
    
    this.service.signOutExternal();
    this._ngZone.run(() => {
      this.router.navigate(['/']).then(() => window.location.reload());
    })
  }

  getHeadClass(): string {
    let styleClass = '';

    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'head-trimmed';
    } else {
      styleClass = 'head-md-screen';
    }

    return styleClass;
  }

  checkCanShowSearchAsOverlay(innerWidth: number): void {
    if (innerWidth < 845) {
      this.canShowSearchAsOverlay = true;
    } else {
      this.canShowSearchAsOverlay = false;
    }
  }
}
