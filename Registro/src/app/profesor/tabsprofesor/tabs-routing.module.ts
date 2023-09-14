import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'profesor',
    component: TabsPage,
    children: [
      {
        path: 'horario',
        loadChildren: () => import('../horario/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'asistencia',
        loadChildren: () => import('../asistencia/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('../perfil/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'cursos',
        loadChildren: () => import('../cursos/tab4.module').then(m => m.Tab4PageModule)
      },
      {
        path: '',
        redirectTo: '/profesor/horario',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'profesor/horario',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
