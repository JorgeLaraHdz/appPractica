import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonItem, IonInput, IonInputPasswordToggle } from '@ionic/angular/standalone';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
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
  constructor(private fb:FormBuilder, private alertita:AlertController, private router:Router) { 
    this.loginForm=this.fb.group({
      email:["",[Validators.required, Validators.email]],
      password:["",[Validators.required, Validators.minLength(6)]]
    })
  }

  ngOnInit() {
  }

  toggleForm() {
    this.isLogin = !this.isLogin;
    this.loginForm.reset();
  }
  onLogin(){
    if(this.loginForm.valid){
      this.mostrarAlerta("Alerta","Aviso importante", "Bienvenido >:)");
    }else{
      this.mostrarAlerta("Alerta","Aviso importante", "Por favor de datos validos.");
    }
  }
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
}
