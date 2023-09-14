import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.page.html',
  styleUrls: ['./carga.page.scss'],
})
export class CargaPage implements AfterViewInit {

  constructor(private router: Router, private aniCtrl: AnimationController) { }

  ngAfterViewInit(): void {
    const splashElement = document.querySelector('.splash');
    if (splashElement) {

    const fadeOutAnimation = this.aniCtrl.create()
      .addElement(splashElement)
      .duration(2500)
      .fromTo('opacity', '1', '0'); 

    fadeOutAnimation.play();
  }
}

  ngOnInit() {
  setTimeout(()=>{
    this.router.navigate(['/login']);
  },3000);}
}