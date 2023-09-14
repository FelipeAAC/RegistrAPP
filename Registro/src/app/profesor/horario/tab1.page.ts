import { Component } from '@angular/core';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
  
})
export class Tab1Page {
  
  //Dias de la semana
  selectedSegment: string = this.getDay();

  getDay() {  
    var Wday: string[] = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];  
    var day = new Date();  
    var hoy = Wday[day.getDay()];  
    return hoy
   } 
  
  constructor() {}

}