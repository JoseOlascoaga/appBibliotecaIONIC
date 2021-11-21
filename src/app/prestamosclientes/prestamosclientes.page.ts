import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BibliotecaService } from 'src/app/servicios/biblioteca.service';
import { FormBuilder, FormGroup,Validator, Validators } from '@angular/forms';
import { AlertController} from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Button } from 'selenium-webdriver';


@Component({
  selector: 'app-prestamosclientes',
  templateUrl: './prestamosclientes.page.html',
  styleUrls: ['./prestamosclientes.page.scss'],
})
export class PrestamosclientesPage implements OnInit {

  myform:FormGroup  
  id_editar:number=0;
  constructor(public toastController: ToastController,public alertController: AlertController,private _builder:FormBuilder, private biblioteca: BibliotecaService) { 
    this.myform=this._builder.group({
      identificacion: ['', [Validators.required, Validators.maxLength(50)]]  ,
      fullname: ['', [Validators.required, Validators.maxLength(50)]]  ,
      phone: ['', [Validators.required]]  ,
      email: ['', [Validators.required, Validators.maxLength(100)]] 
    })
  } 

  lista_clientes: any;
  nuevocli={
    identificacion:null,
    fullname:null,
    phone:null,
    email:null
  }

  ngOnInit() {
    this.recuperarTodos();
    
  }

  recuperarTodos() {
    this.biblioteca.recuperarTodos().subscribe(result => this.lista_clientes = result);
  }

  alta(value:any) {
    this.nuevocli={
      identificacion:value.identificacion,
      fullname:value.fullname,
      phone:value.phone,
      email:value.email
    }
    this.biblioteca.alta(this.nuevocli).subscribe(datos => {
      console.log(datos)
      this.myform.reset()
      this.showAlert()
     
     });
  }
  showAlert() {

    this.alertController.create({
      header: 'Informacion',
      subHeader: 'gestion de contactos',
      message: 'Contacto agregado',
      buttons: ['OK']
    }).then(res => {

      res.present();

    });
  }

  async baja(id:number){
    const alert = await this.alertController.create({
      header: "Borrar cliente",
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
          this.biblioteca.baja(id).subscribe(datos =>{
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
    this.id_editar=id_editar['id'];
    this.myform.setValue({
    identificacion:id_editar['identificacion'],
    fullname:id_editar['fullname'],
    phone:id_editar['phone'],
    email:id_editar['email']
   })
   }

   modificacion(value:any) {
    this.nuevocli={
      identificacion:value.identificacion,
      fullname:value.fullname,
      phone:value.phone,
      email:value.email
    }
    this.biblioteca.modificacion(this.nuevocli,this.id_editar).subscribe(datos => {
      console.log(datos)
      this.myform.reset()
      this.recuperarTodos()
      this.showAlertAct()
    });    
  }


  showAlertAct() {

    this.alertController.create({
      header: 'Informacion',
      subHeader: 'Actualización de datos',
      message: 'Cliente Actualizado',
      buttons: ['OK']
    }).then(res => {
  
      res.present();
  
    });
  }





}
