import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RecuperarPageForm } from './recuperar.page.form';
import { AppState } from 'src/app/store/AppState';
import { Store } from '@ngrx/store';
import { hide, show } from 'src/app/store/loading/loading.actions';
import { recoverPassword } from 'src/app/store/recuperar/recuperar.actions';
import { ToastController } from '@ionic/angular';
import { RecuperarState } from 'src/app/store/recuperar/RecuperarState';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit, OnDestroy {

  form: FormGroup;
  recuperarStateSubscription?: Subscription;
  email: string = '';

  constructor(private router: Router, private formBuilder: FormBuilder, private store: Store<AppState>,
    private toastController: ToastController) {
    this.form = new FormGroup({});
  }

  ngOnInit() {
    this.form = new RecuperarPageForm(this.formBuilder).createForm();
    this.recuperarStateSubscription = this.store.select('recuperar').subscribe(recuperarState => {
      this.onIsRecoveredPassword(recuperarState);
      this.onIsRecoverPasswordFail(recuperarState);
      this.toggleLoading(recuperarState);
    });

    
  }

  ngOnDestroy(): void {
    if (this.recuperarStateSubscription){
      this.recuperarStateSubscription.unsubscribe();
    }
  }

  forgotEmailPassword() {
    this.store.dispatch(recoverPassword({email: this.form.get('email')?.value}));
  }

  private async onIsRecoverPasswordFail(recuperarState: RecuperarState) {
    if (recuperarState.error) {
      const toaster = await this.toastController.create({
        position: "bottom",
        message: "Error: Correo electrónico no encontrado",
        color: "danger"
      });
      toaster.present();
      setTimeout(() => {
        toaster.dismiss();
      }, 5000);
    }
  }

  private async onIsRecoveredPassword(recuperarState: RecuperarState) {
    if (recuperarState.isRecoveredPassword) {
      const toaster = await this.toastController.create({
        position: "bottom",
        message: "Correo de recuperación enviado",
        color: "success"
      });
      toaster.present();
      setTimeout(() => {
        toaster.dismiss();
      }, 5000);
    }
  }

  private async onRecoverPasswordError(error: any) {
    const toaster = await this.toastController.create({
      position: 'bottom',
      message: 'Correo no encontrado',
      color: 'danger'
    });
    toaster.present();
    setTimeout(() => {
      toaster.dismiss();
    }, 5000);
  }

  private toggleLoading(recuperarState: RecuperarState) {
    if (recuperarState.isRecoveringPassword) {
      this.store.dispatch(show());
    } else {
      this.store.dispatch(hide());
    }
  }
}

