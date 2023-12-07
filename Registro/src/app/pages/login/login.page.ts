import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginPageForm } from './login.page.form';
import { AppState } from 'src/app/store/AppState';
import { Store } from '@ngrx/store';
import { hide, show } from 'src/app/store/loading/loading.actions';
import { login } from 'src/app/store/login/login.actions';
import { Subscription } from 'rxjs';
import { LoginState } from 'src/app/store/login/LoginState';
import { ToastController } from '@ionic/angular';

// ... Importaciones anteriores ...

import { UserService } from '../login/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  form: FormGroup;
  loginStateSubscription?: Subscription;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private toastController: ToastController,
    private userService: UserService // Inyecta el servicio UserService
  ) {
    this.form = new FormGroup({});
  }

  ngOnInit() {
    this.form = new LoginPageForm(this.formBuilder).createForm();

    this.loginStateSubscription = this.store.select('login').subscribe(loginState => {
      this.onIsLoggedIn(loginState);

      this.toggleLoading(loginState);
    });
  }

  ngOnDestroy() {
    if (this.loginStateSubscription) {
      this.loginStateSubscription.unsubscribe();
    }
  }

  iniciarSesion() {
    try {
      this.store.dispatch(login({email: this.form.get('email')?.value, password: this.form.get('password')?.value}));
    } catch (error) {
      this.onLoginError(error);
    }
  }

  private toggleLoading(loginState: LoginState) {
    if (loginState.isLoggingIn) {
      this.store.dispatch(show());
    } else {
      this.store.dispatch(hide());
    }
  }

  private onIsLoggedIn(loginState: LoginState) {
    if (loginState.isLoggedIn) {
      const email = this.form.get('email')?.value;
      const domain = email.split('@')[1];
      const username = email.split('@')[0]; // Obtén el nombre de usuario antes del "@"

      // Utiliza UserService para almacenar el nombre de usuario
      this.userService.setUsername(username);

      if (domain === 'duocuc.cl') {
        this.router.navigate(['/alumno']);
      } else if (domain === 'profesor.duoc.cl') {
        this.router.navigate(['/profesor']);
      } else {
        // Handle other domains or show an error message
        console.log('Invalid email domain');
      }
    }
  }

  private async onLoginError(error: any) {
    this.store.dispatch(hide());

    let errorMessage = 'Error al iniciar sesión'; // Mensaje de error predeterminado

    if (error.code === 'auth/invalid-email') {
      errorMessage = 'La dirección de correo electrónico no es válida.';
    } else if (error.code === 'auth/user-not-found') {
      errorMessage = 'No se encontró ningún usuario con esa dirección de correo electrónico.';
    } else if (error.code === 'auth/wrong-password') {
      errorMessage = 'Contraseña incorrecta. Por favor, inténtalo de nuevo.';
    }

    const toaster = await this.toastController.create({
      position: 'bottom',
      message: errorMessage,
      color: 'danger',
      duration: 5000 // Duración del Toast en milisegundos
    });
    toaster.present();
    setTimeout(() => {
      toaster.dismiss();
    }, 5000);
  }

  onFormKeyDown(event: KeyboardEvent) {
    // Check if the pressed key is Enter (key code 13)
    if (event.keyCode === 13) {
      // Prevent the default form submission behavior
      event.preventDefault();
      // Call the iniciarSesion() method
      this.iniciarSesion();
    }
  }
}
