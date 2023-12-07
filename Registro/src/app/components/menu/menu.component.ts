import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  hideMenu: string[] = ['/login']; // Corrige el corchete de cierre aquí
  showMenu: boolean = false;

  constructor(private router: Router, private menuController: MenuController) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showMenu = this.shouldShowMenu(event.url);
      }
    });
  }

  cerrarMenu() {
    this.menuController.close();
  }

  private shouldShowMenu(url: string): boolean {
    console.log('Current URL:', url);
    const shouldShow = !this.hideMenu.includes(url);
    console.log('Should show menu:', shouldShow);
    return shouldShow;
  }
}
