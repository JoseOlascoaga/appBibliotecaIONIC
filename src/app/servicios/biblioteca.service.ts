import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BibliotecaService {

   url='http://127.0.0.1:3000/'; 

  constructor(private http: HttpClient) { }

  /////////////////////////////////////

  //****OBTENER TODOS*****

  //clientes
  recuperarTodos() {
    return this.http.get(`${this.url}getAll`);
  }
  
  //Libros
  recuperarTodoslibro() {
    return this.http.get(`${this.url}getAll4`);
  }
  
  //Autores
  recuperarTodosautores() {
    return this.http.get(`${this.url}getAll3`);
  }

  //Prestamos
  recuperarTodosprestamo() {
    return this.http.get(`${this.url}getAll5`);
  }

  //Editoriales
  recuperarTodoseditoriales() {
    return this.http.get(`${this.url}getAll2`);
  }

/////////////////////////////////////

  //*********INSERTAR***********

  //clientes
  alta(biblioteca:any):Observable<any> {
    return this.http.post(`${this.url}add_contact`, biblioteca);    
  }
  //libros
  altalibro(biblioteca:any):Observable<any> {
    return this.http.post(`${this.url}add_contact4`, biblioteca);    
  }
  //autores
  altaautores(biblioteca:any):Observable<any> {
    return this.http.post(`${this.url}add_contact3`, biblioteca);    
  }
  //Prestamos
  altaprestamo(biblioteca:any):Observable<any> {
    return this.http.post(`${this.url}add_contact5`, biblioteca);    
  }
  //Editoriales
  altaeditorial(biblioteca:any):Observable<any> {
    return this.http.post(`${this.url}add_contact2`, biblioteca);    
  }
////////////////////////////////////
 
  //*******ELIMINAR*******

  //clientes
  baja(codigo:number) {
    return this.http.delete(`${this.url}delete/${codigo}`);
  }
  //libros
  bajalibro(codigo:number) {
    return this.http.delete(`${this.url}delete4/${codigo}`);
  }
  //autores
  bajaa(codigo:number) {
    return this.http.delete(`${this.url}delete3/${codigo}`);
  }
  //Prestamos
  bajaprestamo(codigo:number) {
    return this.http.delete(`${this.url}delete5/${codigo}`);
  }
   //Editorial
   bajaeditorial(codigo:number) {
    return this.http.delete(`${this.url}delete2/${codigo}`);
  }



  ///////////////////////////////////////

  //**********EDITAR************

  //Clientes
  modificacion(biblioteca:any, id:number) {
    return this.http.put(`${this.url}/update/`+id, biblioteca);
    } 
  //Autores
  modificacionautores(biblioteca:any, IdAutores:number) {
    return this.http.put(`${this.url}/update3/`+IdAutores, biblioteca);    
  }
  //Libros
  modificacionlibro(biblioteca:any, Idlibro:number) {
  return this.http.put(`${this.url}/update4/`+Idlibro, biblioteca);
  } 
  //Prestamos
  modificacionprestamo(biblioteca:any, IdPrestamo:number) {
  return this.http.put(`${this.url}/update5/`+IdPrestamo, biblioteca);
  } 
  //Editorial
  modificacioneditorial(biblioteca:any, IdEditorial:number) {
    return this.http.put(`${this.url}/update2/`+IdEditorial, biblioteca);
    } 
  

}