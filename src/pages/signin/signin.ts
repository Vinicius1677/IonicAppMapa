import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { ResetpasswordPage } from '../resetpassword/resetpassword';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from 'ionic-angular';
import { MapaPage } from '../mapa/mapa';

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  loginForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formbuilder: FormBuilder,
    public alertCtrl: AlertController,
    public angularFireauth: AngularFireAuth

    ) {
      this.Form();
  }

  ionViewDidLoad() {
  }

  Form() {
    this.loginForm = this.formbuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    })
  }

  signIn() {
    this.angularFireauth.auth.signInWithEmailAndPassword(this.loginForm.value.email, 
      this.loginForm.value.password)
         .then(() => {
          this.navCtrl.setRoot(MapaPage);
        })
      .catch((error) => {
        if(error.code == 'auth/user-not-found') {
          this.presentAlert('Erro', 'Usuário não encontrado');
        }
        if(error.code == 'auth/wrong-password') {
          this.presentAlert('Erro', 'Senha incorreta, digite novamente.');
          this.loginForm.controls['password'].setValue(null);
        }
      })
  }

  criarConta(){
    this.navCtrl.push(SignupPage);
  }

  recuperarSenha() {
    this.navCtrl.push(ResetpasswordPage);
  }

  presentAlert(title: string, subtitle: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: ['OK']
    });
    alert.present();
  }

}
