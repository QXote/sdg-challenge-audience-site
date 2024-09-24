import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatToolbar} from "@angular/material/toolbar";
import {HeaderComponent} from "./core/header/header.component";
import {MatTabLink, MatTabNav, MatTabNavPanel} from "@angular/material/tabs";
import {MatIcon} from "@angular/material/icon";
import {slideInAnimation} from "./shared/animations/slide-in-animation";
import {routes} from "./app.routes";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbar, HeaderComponent, MatTabNavPanel, MatTabLink, MatTabNav, RouterLink, RouterLinkActive, MatIcon],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [slideInAnimation]
})
export class AppComponent implements OnInit {
  title = 'sdg-challenge-audience-site';
  navLinks: any[];
  activeLinkIndex = -1;
  private previousIndex = -1;
  showHeader: boolean = false;

  constructor(private router: Router) {
    this.initializeNavLinks();
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentIndex = routes.findIndex(tab => "/" + tab.path === this.router.url);
        console.log('currentIndex', currentIndex)
        if (currentIndex !== -1) {
          this.previousIndex = this.activeLinkIndex;
          this.activeLinkIndex = currentIndex;
        }

        let currentRoute = this.router.routerState.root;
        while (currentRoute.firstChild) {
          currentRoute = currentRoute.firstChild;
        }
        this.showHeader = currentRoute.snapshot.data.showHeader || false;
      }
    });
  }

  prepareRoute() {
    return this.activeLinkIndex;
  }

  private initializeNavLinks() {
    this.navLinks = routes
      .filter(route => route.data && route.data.showInTabs)
      .map(route => ({
        label: route.data.label,
        link: `/${route.path}`,
        icon: route.data.icon
      }));
  }
}
