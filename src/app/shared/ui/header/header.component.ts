import { Component, signal } from '@angular/core';
import { Route, RouterLink, RouterLinkActive } from '@angular/router';
import { routes } from '../../../app.routes';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent {


  public menuItems = this.getMenuItems(routes)

  getMenuItems(routes: Route[]): Route[] {
    return routes
        .flat()
        .filter(route => route && route.title);
  } 

}
