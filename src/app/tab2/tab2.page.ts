import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonRow, IonGrid, IonCol, IonButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { addIcons } from 'ionicons';
import { createOutline, trashOutline } from 'ionicons/icons';
import { Auth } from '../services/auth';
import { AlertController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonLabel, IonIcon, IonButton, IonCol, IonGrid, IonRow, IonItem, IonList, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent]
})
export class Tab2Page {
  productos = []
  constructor(private authService: Auth, private alertCtrl: AlertController) {
    addIcons({
      'create-outline': createOutline,
      'trash-outline': trashOutline
    });
  }

  ngOnInit() {
    // Datos de ejemplo para los productos
    this.authService.getProducts().subscribe((res: any) => {
      this.productos = res.Respuesta
    })
  }

  editar(producto: any) {
    console.log('Editar producto:', producto);
    // Lógica para editar el producto
    this.ActualizarProducto('Actualizar Producto', '', `Actualizar el producto ${producto.Nombre}.`, producto)
  }
  borrar(producto: any) {
    console.log('Eliminar producto:', producto);
    // Lógica para eliminar el producto
    this.eliminarProducto('Aviso', '', `El producto ${producto.Nombre} se va a eliminar, Continuar?.`, producto)
  }
  async eliminarProducto(titulo: string, subtitulo: string, mensaje: string, producto: any) {
    const alerta = await this.alertCtrl.create({
      header: titulo,
      subHeader: subtitulo,
      message: mensaje,
      buttons: [
        {
          text: 'Eliminar',
          handler: () => {
            this.authService.delProduct(producto.id).subscribe((res: any) => {
              if (res.intResponse == '200') {
                this.alertaEliminarProducto();
                this.ngOnInit();
              }
            })
          }
        },{ text: 'Cancelar' }
      ]
    });
    await alerta.present();
  }
  async ActualizarProducto(titulo: string, subtitulo: string, mensaje: string, producto: any) {
    const alerta = await this.alertCtrl.create({
      header: titulo,
      subHeader: subtitulo,
      message: mensaje,
      buttons: ['Actualizar', 'Cancelar'],
      inputs: [
        {
          placeholder: producto.Nombre,
          attributes: {
            maxlength: 35,
          },
        },
        {
          type: 'number',
          placeholder: producto.Precio,
          min: 1,
          max: 100,
        },
        {
          placeholder: producto.Categoria,
          attributes: {
            maxlength: 100,
          },
        }
      ]
    });
    await alerta.present();
  }
  async alertaEliminarProducto() {
    const alerta = await this.alertCtrl.create({
      header: 'Producto eliminado',
      subHeader: '',
      message: 'El producto ha sido eliminado correctamente.',
      buttons: ['OK']
    });
    await alerta.present();
  }
}
