 import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../../login/user.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  nombres: string = 'Nombre de ejemplo';
  correo: string = 'correo@duocuc.cl';
  carrera: string = 'Ingeniería Informática';
  jornada: string = 'Diurna';
  rut: string = '12.345.678-9';

  
  imagenPerfil: string = 'https://ionicframework.com/docs/img/demos/avatar.svg';

  @ViewChild('nombresField', { static: false }) nombresField!: ElementRef;
  @ViewChild('correoField', { static: false }) correoField!: ElementRef;
  @ViewChild('carreraField', { static: false }) carreraField!: ElementRef;
  @ViewChild('jornadaField', { static: false }) jornadaField!: ElementRef;
  @ViewChild('rutField', { static: false }) rutField!: ElementRef;

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;


  isEditing: boolean = false;

  editarInformacion() {
    this.isEditing = !this.isEditing;
    this.disableFields(!this.isEditing);
  }

  seleccionarImagen() {
    this.fileInput.nativeElement.click();
  }

  private disableFields(disabled: boolean) {
    this.nombresField.nativeElement.disabled = disabled;
    this.correoField.nativeElement.disabled = disabled;
    this.carreraField.nativeElement.disabled = disabled;
    this.jornadaField.nativeElement.disabled = disabled;
    this.rutField.nativeElement.disabled = disabled;
  }

  
  cargarNuevaImagen(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const archivos = inputElement.files;
  
    if (archivos && archivos.length > 0) {
      const archivoSeleccionado = archivos[0];
      const urlImagen = URL.createObjectURL(archivoSeleccionado);
      this.imagenPerfil = urlImagen;
    }
  }

  username: string;

  constructor(private userService: UserService) {
    this.username = this.userService.getUsername();
  }

  ngAfterViewInit() {
    if (this.fileInput) {
    }
  
}
}
