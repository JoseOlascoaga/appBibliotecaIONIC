import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BibliotecaService } from 'src/app/servicios/biblioteca.service';
import { FormBuilder, FormGroup,Validator, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-prstamolibros',
  templateUrl: './prstamolibros.page.html',
  styleUrls: ['./prstamolibros.page.scss'],
})
export class PrstamolibrosPage implements OnInit {

  myform:FormGroup  
  id_editar:number=0;
  constructor(public alertController: AlertController,private _builder:FormBuilder,private biblioteca: BibliotecaService) { 
    this.myform=this._builder.group({
      codprestamo: ['', [Validators.required, Validators.maxLength(50)]]  ,
      IdContacts: ['', [Validators.required, Validators.maxLength(50)]]  ,
      IdLibro : ['', [Validators.required]]  ,
      fecha: ['', [Validators.required]] 
    })
  } 

  lista_prestamo: any;
  lista_clientes: any;
  lista_libros: any;

  nuevopre={
    codprestamo:null,
    IdContacts:null,
    IdLibro :null,
    fecha:null,
  }

  ngOnInit() {
    this.recuperarTodosprestamo();
    this.recuperarTodos();
    this.recuperarTodoslibro();
  }

  recuperarTodoslibro() {
    this.biblioteca.recuperarTodoslibro().subscribe(result => this.lista_libros = result);
  }

  recuperarTodos() {
    this.biblioteca.recuperarTodos().subscribe(result => this.lista_clientes = result);
  }

  recuperarTodosprestamo() {
    this.biblioteca.recuperarTodosprestamo().subscribe(result => this.lista_prestamo = result);
  }

  altaprestamo(value:any) {
    this.nuevopre={
      codprestamo:value.codprestamo,
      IdContacts:value.IdContacts,
      IdLibro:value.IdLibro,
      fecha:value.fecha,
    }
    this.biblioteca.altaprestamo(this.nuevopre).subscribe(datos => {
      console.log(datos)
      this.myform.reset()
      this.showAlert()
     
     });
  }



  showAlert() {

    this.alertController.create({
      header: 'Informacion',
      subHeader: 'Gestion de Prestamos',
      message: 'Prestamo agregado',
      buttons: ['OK']
    }).then(res => {

      res.present();

    });

  

  }

  async bajaprestamo(IdPrestamo:number){
    const alert = await this.alertController.create({
      header: "Borrar prestamo",
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
          this.biblioteca.bajaprestamo(IdPrestamo).subscribe(datos =>{
          console.log(datos)  
          console.log("Prestamo eliminado")
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
    this.id_editar=id_editar['IdPrestamo'];
    this.myform.setValue({
    codprestamo:id_editar['codprestamo'],
    IdContacts:id_editar['IdContacts'],
    IdLibro:id_editar['IdLibro '],
    fecha:id_editar['fecha']
   })
   }

   modificacionprestamo(value:any) {
    this.nuevopre={
      codprestamo:value.codprestamo,
      IdContacts:value.IdContacts,
      IdLibro:value.IdLibro,
      fecha:value.fecha,
    }
    this.biblioteca.modificacionprestamo(this.nuevopre,this.id_editar).subscribe(datos => {
      console.log(datos)
      alert("Prestamo editado")
      this.myform.reset()
      this.recuperarTodosprestamo()
    });    
  }

  

}
  