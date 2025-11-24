import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonRow, IonGrid, IonCol, IonButton, IonIcon, IonLabel, IonFab, IonFabButton } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { createOutline, trashOutline } from 'ionicons/icons';
import { Auth } from '../services/auth';
import { AlertController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonFabButton, IonFab, IonLabel, IonIcon, IonButton, IonCol, IonGrid, IonRow, IonItem, IonList, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent]
})
export class Tab2Page {
  productos = []
  constructor(private authService: Auth, private alertCtrl: AlertController) {
    addIcons({
      'create-outline': createOutline,
      'trash-outline': trashOutline,
      'add': add
    });
  }

  ngOnInit() {
    // Datos de ejemplo para los productos
    this.authService.getProducts().subscribe((res: any) => {
      this.productos = res.Respuesta
    })
  }

  agregar() {
    console.log('Agregar nuevo producto');
    this.newProducto('Nuevo Producto', '', 'Ingrese los datos del nuevo producto.')

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
  async newProducto(titulo: string, subtitulo: string, mensaje: string) {
    const alerta = await this.alertCtrl.create({
      header: titulo,
      subHeader: subtitulo,
      message: mensaje,
      buttons:[
        {
          text: 'Crear',
          handler:(data)=>{
            console.log(data);
            let datos={
              nombre: data[0],
              precio: data[1],
              categoria: data[2]
            }
            this.authService.newProduct(datos).subscribe((res:any)=>{
              console.log(res);
              if(res.intResponse=='200'){
                this.alertaNuevoProducto();
                this.ngOnInit();
              }
            })
          }
        },{ text: 'Cancelar' }
      ],
         inputs: [
        {
          placeholder: "Nombre del producto",
          attributes: {
            maxlength: 35,
          },
        },
        {
          type: 'number',
          placeholder: "Precio del producto",
          min: 1,
          max: 100,
        },
        {
          placeholder: "Categoria del producto",
          attributes: {
            maxlength: 100,
          },
        }
      ]
    })
    await alerta.present();
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
      buttons: [
        {
          text: 'Actualizar',
          handler: (data) => {
            console.log(data);
            let datos={
              id:producto.id,
              nombre: data[0] || producto.Nombre,
              precio: data[1] || producto.Precio,
              categoria: data[2] || producto.Categoria
            }
            console.log('Datos a actualizar:', datos);
            this.authService.putProduct(datos).subscribe((res:any)=>{
              if(res.intResponse=='200'){
                this.alertaActualizarProducto();
                this.ngOnInit();
              }
            })

          }
        },
      ],
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
  async alertaActualizarProducto() {
    const alerta = await this.alertCtrl.create({
      header: 'Producto Actualizado',
      subHeader: '',
      message: 'El producto ha sido Actualizado correctamente.',
      buttons: ['OK']
    });
    await alerta.present();
  }
  async alertaNuevoProducto() {
    const alerta = await this.alertCtrl.create({
      header: 'Producto Insertado',
      subHeader: '',
      message: 'El producto ha sido creado correctamente.',
      buttons: ['OK']
    });
    await alerta.present();
  }

}
