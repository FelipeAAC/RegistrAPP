import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  iniciarSesion() {
    if (this.email === 'alumno@duocuc.cl' && this.password === '1234') {
      const usuarioAlumno = {
        username: 'alumno',
        email: this.email,
        token: 'token_alumno',
        tipo: 'alumno',
      };

      localStorage.setItem('usuario', JSON.stringify(usuarioAlumno));
      this.router.navigate(['/alumno/horario']);

    } else if (this.email === 'profesor@duocuc.cl' && this.password === '1234') {
      const usuarioProfesor = {
        username: 'profesor',
        email: this.email,
        token: 'token_profesor',
        tipo: 'profesor',
      };

      localStorage.setItem('usuario', JSON.stringify(usuarioProfesor));
      this.router.navigate(['/profesor/horario']);

    } 
  }
}
