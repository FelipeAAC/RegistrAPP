import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {}

  redirectToTab1() {
    this.router.navigate(['/tab1']);
  }
}
