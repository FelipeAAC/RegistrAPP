import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'alumno',
    component: TabsPage,
    children: [
      {
        path: 'horario',
        loadChildren: () => import('../horario/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'cursos',
        loadChildren: () => import('../cursos/tab4.module').then(m => m.Tab4PageModule)
      },
      {
        path: 'escanearQR',
        loadChildren: () => import('../escanearQR/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('../perfil/tab3.module').then(m => m.Tab3PageModule)
      },
      
      {
        path: '',
        redirectTo: '/alumno/horario',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/alumno/horario',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
