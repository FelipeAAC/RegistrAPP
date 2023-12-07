import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent  implements OnInit {

  @Input() mensaje: string = '';
  @Input() field: AbstractControl<any, any> | null = null;
  @Input() error: string= '';

  constructor() { }

  ngOnInit() {}

  mostrarMensaje() {
    if (this.field !== null && this.field.touched) {
      if (this.field.errors) {
        // Verificar el tipo de error y mostrar el mensaje correspondiente
        if (this.field.errors['required'] && this.error === 'required') {
          return true;
        }
        if (this.field.errors['email'] && this.error === 'email') {
          return true;
        }
        // Agregar más condiciones para otros tipos de errores según sea necesario

        // Si no hay coincidencia con el tipo de error, no mostrar mensaje
        return false;
      }
    }
    return false;
  }

}
