import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonItem, IonInput, IonInputPasswordToggle } from '@ionic/angular/standalone';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Auth } from 'src/app/services/auth';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonInput, IonItem, IonButton, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonContent, CommonModule, FormsModule, IonInputPasswordToggle, ReactiveFormsModule]
})
export class LoginPage implements OnInit {
  isLogin: boolean = true;
  loginForm: FormGroup
  constructor(
    private fb:FormBuilder, 
    private alertita:AlertController, 
    private router:Router,
    private authService:Auth
  ) { 
    this.loginForm=this.fb.group({
      email:["",[Validators.required, Validators.email]],
      password:["",[Validators.required, Validators.minLength(6)]]
    })
  }

  ngOnInit() {
  }
  //Para cambiar de login a registro y biceversa
  toggleForm() {
    this.isLogin = !this.isLogin;
    this.loginForm.reset();
  }
  //Funcion para loguear
  onLogin(){
    if(this.isLogin){
      if(this.loginForm.valid){
        const { email, password } = this.loginForm.value;
        let data={
          email: email,
          password: password
        }
        this.authService.login(data).subscribe((res:any)=>{
          console.log(res)
          if(res.intResponse==='200'){
            this.mostrarAlerta('Login Exitoso','','¡Bienvenido de nuevo!')
          }else{
            this.mostrarError('Error de Login','','Correo o contraseña incorrectos.')
          }
        }, error=>{
          this.mostrarError('Error de Login','','Error en la conexión al servidor.')
        }
      )}
    }else{
      if(this.loginForm.valid){
        const { email, password } = this.loginForm.value;
        let data={
          email: email.trim(),
          password: password.trim()
        }
        this.authService.register(data).subscribe((res:any)=>{
          if(res.intResponse==='200'){
            this.mostrarAlerta('Registro Exitoso','','¡Cuenta creada correctamente!')
          }else{
            this.mostrarError('Error de Registro','','El correo ya está en uso.')
          }
        }, error=>{
          this.mostrarError('Error de Registro','','Error en la conexión al servidor.')
        }
      )
      }
    }
  }
//Alertas
  async mostrarAlerta(header: string,sub:string, message:string,) {
    const alerta = await this.alertita.create({
      header: header,
      subHeader: sub,
      message: message,
      buttons: [
        {
          text: 'Ok',
          role: 'confirm',
          handler: ()=>{
            this.router.navigate(['/tabs/tab1'])
          }
        }
      ],
    });

    await alerta.present();
  }
  async mostrarError(header: string,sub:string, message:string,) {
    const alerta = await this.alertita.create({
      header: header,
      subHeader: sub,
      message: message,
      buttons: ['Ok'],
    });

    await alerta.present();
  }
}
