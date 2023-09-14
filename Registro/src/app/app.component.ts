// Importa los módulos necesarios de Ionic y Angular Material
import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  showMenu: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
 
        this.showMenu = this.shouldShowMenu(event.url);
      }
    });
  }

  private shouldShowMenu(url: string): boolean {

    return true;
  }

  toggleMenu() {
  }
  
}
