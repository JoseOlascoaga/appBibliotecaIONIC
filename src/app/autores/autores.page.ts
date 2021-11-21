import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BibliotecaService } from 'src/app/servicios/biblioteca.service';
import { FormBuilder, FormGroup,Validator, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-autores',
  templateUrl: './autores.page.html',
  styleUrls: ['./autores.page.scss'],
})
export class AutoresPage implements OnInit {

  myformautor:FormGroup  
  id_editar:number=0;
  constructor(public alertController: AlertController,private _builder:FormBuilder,private biblioteca: BibliotecaService) { 
    this.myformautor=this._builder.group({
      codautor: ['', [Validators.required, Validators.maxLength(50)]]  ,
      nombre: ['', [Validators.required, Validators.maxLength(50)]]  ,
      apellido: ['', [Validators.required]]  ,
      nacionalidad: ['', [Validators.required, Validators.maxLength(100)]] 
    })
  } 

  lista_autores: any;
  nuevoautor={
    codautor:null,
    nombre:null,
    apellido:null,
    nacionalidad:null
  }

  ngOnInit() {
    this.recuperarTodosautores();
  }

  recuperarTodosautores() {
    this.biblioteca.recuperarTodosautores().subscribe(result => this.lista_autores = result);
  }

  altaautores(value:any) {
    this.nuevoautor={
      codautor:value.codautor,
      nombre:value.nombre,
      apellido:value.apellido,
      nacionalidad:value.nacionalidad
    }
    this.biblioteca.altaautores(this.nuevoautor).subscribe(datos => {
      console.log(datos)
      this.myformautor.reset()
      this.showAlert()
     
     });
  }

  showAlert() {

    this.alertController.create({
      header: 'Informacion',
      subHeader: 'Gestion de Autores',
      message: 'Autor agregado',
      buttons: ['OK']
    }).then(res => {

      res.present();

    });
  }

async bajaa(IdAutores:number){
  const alert = await this.alertController.create({
    header: "Borrar autor",
    message: "Esta acción no se puede deshacer, ¿Estás seguro?",
    buttons: [
      {
        text: 'No',
        handler: () => {
          console.log("No cancel")
        }
    },
    {
      text: 'Si',
      role: 'destructive',
      handler: () => {
        this.biblioteca.bajaa(IdAutores).subscribe(datos =>{
        console.log(datos)  
        console.log("Usuario eliminado")
        this.myformautor.reset() 
        });
        
      }
    }
  ]
  });
  await alert.present()
  let result = await alert.onDidDismiss();
  console.log(result);
}


seleccionar(id_edi:any) {
  this.id_editar=id_edi['IdAutores'];
  this.myformautor.setValue({
  codautor:id_edi['codautor'],
  nombre:id_edi['nombre'],
  apellido:id_edi['apellido'],
  nacionalidad:id_edi['nacionalidad']
 })
 }

modificacionautores(value:any) {
  this.nuevoautor={
    codautor:value.codautor,
    nombre:value.nombre,
    apellido:value.apellido,
    nacionalidad:value.nacionalidad
  }
  this.biblioteca.modificacionautores(this.nuevoautor,this.id_editar).subscribe(datos => {
    console.log(datos)
    this.myformautor.reset()
    this.recuperarTodosautores()
    this.showAlertAct()
  });    
}

showAlertAct() {

  this.alertController.create({
    header: 'Informacion',
    subHeader: 'Actualización de datos',
    message: 'Autor Actualizado',
    buttons: ['OK']
  }).then(res => {

    res.present();

  });
}



 

}
