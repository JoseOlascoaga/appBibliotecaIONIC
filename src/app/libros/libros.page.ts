import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BibliotecaService } from 'src/app/servicios/biblioteca.service';
import { FormBuilder, FormGroup,Validator, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ActionSheetController} from '@ionic/angular';


@Component({
  selector: 'app-libros',
  templateUrl: './libros.page.html',
  styleUrls: ['./libros.page.scss'],
})
export class LibrosPage implements OnInit {

  myform:FormGroup  
  id_editar:number=0;
  constructor(public alertController: AlertController, private _builder:FormBuilder, private actionSheetController: ActionSheetController,  private biblioteca: BibliotecaService) { 
    this.myform=this._builder.group({
      codlibro: ['', [Validators.required, Validators.maxLength(50)]]  ,
      nombrelibro: ['', [Validators.required, Validators.maxLength(50)]]  ,
      Idautor: ['', [Validators.required]]  ,
      Ideditorial: ['', [Validators.required, ]] ,
      FechaLanzamiento: ['', [Validators.required]]  
    })
  } 

  lista_libros: any;
  lista_autores: any;
  lista_editoriales: any;

  nuevolibro={
    codlibro:null,
    nombrelibro:null,
    Idautor:null,
    Ideditorial:null,
    FechaLanzamiento:null
  }
  
  ngOnInit() {
    this.recuperarTodoslibro();
    this.recuperarTodosautores();
    this.recuperarTodoseditoriales();
  }

  recuperarTodoseditoriales() {
    this.biblioteca.recuperarTodoseditoriales().subscribe(result => this.lista_editoriales = result);
  }

  recuperarTodosautores() {
    this.biblioteca.recuperarTodosautores().subscribe(result => this.lista_autores = result);
  }

  recuperarTodoslibro() {
    this.biblioteca.recuperarTodoslibro().subscribe(result => this.lista_libros = result);
  }

  altalibro(value:any) {
    this.nuevolibro={
      codlibro:value.codlibro,
      nombrelibro:value.nombrelibro,
      Idautor:value.Idautor,
      Ideditorial:value.Ideditorial,
      FechaLanzamiento:value.FechaLanzamiento
    }
    this.biblioteca.altalibro(this.nuevolibro).subscribe(datos => {
      console.log(datos)
      this.myform.reset()
      this.showAlert()
     
     });
  }

  showAlert() {

    this.alertController.create({
      header: 'Informacion',
      subHeader: 'Gestion de Libros',
      message: 'Libro agregado',
      buttons: ['OK']
    }).then(res => {

      res.present();

    });
  }
  

async bajalibro(Idlibro:number){
  const alert = await this.alertController.create({
    header: "Borrar Libro",
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
        this.biblioteca.bajalibro(Idlibro).subscribe(datos =>{
        console.log(datos)  
        console.log("Usuario eliminado")
        this.myform.reset() 
        });
        
      }
    }
  ]
  });
  await alert.present()
  let result = await alert.onDidDismiss();
  console.log(result);
}

seleccionar(id_editar:any) {
  this.id_editar=id_editar['Idlibro'];
  this.myform.setValue({
  codlibro:id_editar['codlibro'],
  nombrelibro:id_editar['nombrelibro'],
  Idautor:id_editar['Idautor'],
  Ideditorial:id_editar['Ideditorial'],
  FechaLanzamiento:id_editar['FechaLanzamiento']
 })
 }

 modificacionlibro(value:any) {
  this.nuevolibro={
    codlibro:value.codlibro,
    nombrelibro:value.nombrelibro,
    Idautor:value.Idautor,
    Ideditorial:value.Ideditorial,
    FechaLanzamiento:value.FechaLanzamiento
  }
  this.biblioteca.modificacionlibro(this.nuevolibro,this.id_editar).subscribe(datos => {
    console.log(datos)
    this.myform.reset()
    this.recuperarTodoslibro()
    this.showAlertAct()
  });    
}

showAlertAct() {

  this.alertController.create({
    header: 'Informacion',
    subHeader: 'Actualización de datos',
    message: 'Libro Actualizado',
    buttons: ['OK']
  }).then(res => {

    res.present();

  });
}

  
}
