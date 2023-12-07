import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-boton',
  templateUrl: './boton.component.html',
  styleUrls: ['./boton.component.scss'],
})
export class BotonComponent  implements OnInit {

  @Input() label: string = '';
  @Input() lleno: string = '"solid"'
  constructor() { }

  ngOnInit() {}

}
