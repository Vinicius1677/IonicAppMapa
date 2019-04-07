import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { MapaPage } from '../mapa/mapa';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  registerForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formbuilder: FormBuilder,
    public alertCtrl: AlertController,
    public angularFireauth: AngularFireAuth
  ) {
    this.registerUser();
  }

  ionViewDidLoad() {
  }

  presentAlert(title: string, subtitle: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: ['OK']
    });
    alert.present();
  }

  registerUser() {
    this.registerForm = this.formbuilder.group({
      name: [null, [Validators.required, Validators.minLength(5)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    })
  }

  creatAccount() {
    if (this.registerForm.valid) {
      this.angularFireauth.auth.createUserWithEmailAndPassword(
        this.registerForm.value.email, this.registerForm.value.password)
        .then(() => {
          this.presentAlert('Usuário cadastrado', 'usuário cadastrado com sucesso!');
          this.navCtrl.setRoot(MapaPage);
        })
        .catch((error: any) => {
          if (error.code == 'auth/email-already-in-use') {
            this.presentAlert('Erro', 'O email cadastrado já está em uso.');
          }
          else if (error.code == 'auth/invalid-email') {
            this.presentAlert('Erro', 'O email cadastrado é inválido.');
          }
          else if (error.code == 'auth/operation-not-allowed') {
            this.presentAlert('Erro', 'Operação não permitida.');
          }
          else if (error.code == 'auth/weak-password') {
            this.presentAlert('Erro', 'A senha do usuário é fraca.');
          }
        })
    }
  }

}
