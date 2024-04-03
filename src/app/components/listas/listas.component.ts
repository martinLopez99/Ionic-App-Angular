import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';
import { Lista } from 'src/app/models/lista.model';
import { DeseosService } from 'src/app/services/deseos.service';


@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @ViewChild( IonList ) lista: IonList;
  @Input() terminada = true;

  constructor(public deseoService:DeseosService,
              private router:Router,
              private alertController:AlertController) { }
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {}

  listaSeleccionada( elemento : Lista ){
    if (this.terminada ) {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${elemento.id}`);
    } else{
      this.router.navigateByUrl(`/tabs/tab1/agregar/${elemento.id}`);
    }
  }

  borrarLista(elementos : Lista){
    this.deseoService.borrarLista(elementos);
  }

  async editarLista(elementos : Lista){

      const alert = await this.alertController.create({
        header: 'Editar Lista',
        inputs: [
          {
            name: 'Titulo',
            type: 'text',
            value: elementos.titulo,
            placeholder: 'Nombre de la lista',
            label: 'Nombre de la lista'
          }
        ],
        buttons: [{
          text:'Cancelar',
          role: 'cancel',
          handler: () =>{
            console.log('Cancelar');
          }
        },
        {
          text: 'Actualizar',
          handler: (data) => {
            
            if(data.Titulo.length === 0){
              return;
            }
            elementos.titulo = data.titulo;
            this.deseoService.guardarStorage();
            this.lista.closeSlidingItems();
          }
        }
      ],
      });
  
      alert.present();
  }
}

