import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/principal',
    pathMatch: 'full'
  },
  
  {
    path: 'prestamosclientes',
    loadChildren: () => import('./prestamosclientes/prestamosclientes.module').then( m => m.PrestamosclientesPageModule)
  },
  {
    path: 'principal',
    loadChildren: () => import('./principal/principal.module').then( m => m.PrincipalPageModule)
  },
  {
    path: 'libros',
    loadChildren: () => import('./libros/libros.module').then( m => m.LibrosPageModule)
  },
  {
    path: 'autores',
    loadChildren: () => import('./autores/autores.module').then( m => m.AutoresPageModule)
  },
  {
    path: 'prstamolibros',
    loadChildren: () => import('./prstamolibros/prstamolibros.module').then( m => m.PrstamolibrosPageModule)
  },
  {
    path: 'editoriales',
    loadChildren: () => import('./editoriales/editoriales.module').then( m => m.EditorialesPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
