import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BibliotecaService } from 'src/app/servicios/biblioteca.service';
import { FormBuilder, FormGroup,Validator, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ActionSheetController} from '@ionic/angular';

@Component({
  selector: 'app-editoriales',
  templateUrl: './editoriales.page.html',
  styleUrls: ['./editoriales.page.scss'],
})
export class EditorialesPage implements OnInit {

  myform:FormGroup  
  id_editar:number=0;
  constructor(public alertController: AlertController,private _builder:FormBuilder,private biblioteca: BibliotecaService) { 
    this.myform=this._builder.group({
      codeditorial: ['', [Validators.required, Validators.maxLength(50)]]  ,
      nombre: ['', [Validators.required, Validators.maxLength(50)]]  
    })
  } 

  lista_editoriales: any;

  nuevoeditorial={
    codeditorial:null,
    nombre:null
  }

  ngOnInit() {
    this.recuperarTodoseditoriales();
  }

  recuperarTodoseditoriales() {
    this.biblioteca.recuperarTodoseditoriales().subscribe(result => this.lista_editoriales = result);
  }

  altaeditorial(value:any) {
    this.nuevoeditorial={
      codeditorial:value.codeditorial,
      nombre:value.nombre
    }
    this.biblioteca.altaeditorial(this.nuevoeditorial).subscribe(datos => {
      console.log(datos)
      this.myform.reset()
      this.showAlert()
     });
  }

  showAlert() {

    this.alertController.create({
      header: 'Informacion',
      subHeader: 'Gestion de Editoriales',
      message: 'Editorial agregado',
      buttons: ['OK']
    }).then(res => {

      res.present();

    });
  }

  async bajaeditorial(IdEditorial:number){
    const alert = await this.alertController.create({
      header: "Borrar editorial",
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
          this.biblioteca.bajaeditorial(IdEditorial).subscribe(datos =>{
          console.log(datos)  
          console.log("Editorial eliminado")
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

  seleccionar(id_edi:any) {
    this.id_editar=id_edi['IdEditorial'];
    this.myform.setValue({
    codeditorial:id_edi['codeditorial'],
    nombre:id_edi['nombre']
   })
   }

   modificacioneditorial(value:any) {
    this.nuevoeditorial={
      codeditorial:value.codeditorial,
      nombre:value.nombre
    }
    this.biblioteca.modificacioneditorial(this.nuevoeditorial,this.id_editar).subscribe(datos => {
      console.log(datos)
      this.myform.reset()
      this.recuperarTodoseditoriales()
      this.showAlertAct()
    });    
  }

  showAlertAct() {

    this.alertController.create({
      header: 'Informacion',
      subHeader: 'Actualización de datos',
      message: 'Editorial Actualizado',
      buttons: ['OK']
    }).then(res => {
  
      res.present();
  
    });
  }



}
