import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth-guard';

const routes: Routes = [
  {
    path:'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path:'carga',
    loadChildren: () => import('./pages/carga/carga.module').then(m => m.CargaPageModule)
  },
  {
    path:'registro',
    loadChildren: () => import('./pages/registro/registro.module').then(m => m.RegistroPageModule)
  },
  {
    path:'recuperar',
    loadChildren: () => import('./pages/recuperar/recuperar.module').then(m => m.RecuperarPageModule)
  },
  {
    path: '',
    redirectTo:'carga',
    pathMatch: 'full'
  },
  {
    path: 'alumno',
    loadChildren: () => import('./pages/alumno/tabsalumno/tabs.module').then(m => m.TabsPageModule), canLoad: [AuthGuard]
  },
  {
    path: 'profesor',
    loadChildren: () => import('./pages/profesor/tabsprofesor/tabs.module').then(m => m.TabsPageModule), canLoad: [AuthGuard]
  },
  {
    path: 'contacto',
    loadChildren: () => import('./pages/contacto/contacto.module').then( m => m.ContactoPageModule), canLoad: [AuthGuard]
  },
  {
    path: 'informacion',
    loadChildren: () => import('./pages/informacion/informacion.module').then( m => m.InformacionPageModule), canLoad: [AuthGuard]
  },
  {
    path: 'configuracion',
    loadChildren: () => import('./pages/configuracion/configuracion.module').then( m => m.ConfiguracionPageModule), canLoad: [AuthGuard]
  },



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
