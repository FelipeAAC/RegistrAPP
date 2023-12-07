import { Component } from '@angular/core';

@Component({
  selector: 'app-contacto',
  templateUrl: 'contacto.page.html',
  styleUrls: ['contacto.page.scss']
})
export class ContactoPage {
  nombre: string = '';
  correo: string = '';
  mensaje: string = '';

  constructor() {}

  enviarMensaje() {
    
    console.log('Nombre:', this.nombre);
    console.log('Correo:', this.correo);
    console.log('Mensaje:', this.mensaje);

  }
}
