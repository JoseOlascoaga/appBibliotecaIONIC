import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Principal', url: 'principal', icon: 'home' },
    { title: 'Clientes', url: 'prestamosclientes', icon: 'people' },
    { title: 'Libros', url: 'libros', icon: 'library' },
    { title: 'Editoriales', url: 'editoriales', icon: 'library' },
    { title: 'Prestamos', url: 'prstamolibros', icon: 'copy' },
    { title: 'Autores', url: 'autores', icon: 'accessibility' },
  ];
  
  constructor() {}
}

