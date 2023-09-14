import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  selectedSegment: string = this.getDay();

  isSelected: boolean = false;

  toggleSelection() {
    this.isSelected = !this.isSelected;
  }

  getDay() {
    const dias = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
    const day = new Date();
    const hoy = dias[day.getDay()];
    return hoy;
  }

  constructor() {}
}