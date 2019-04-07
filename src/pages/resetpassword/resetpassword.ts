import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Generated class for the ResetpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resetpassword',
  templateUrl: 'resetpassword.html',
})
export class ResetpasswordPage {
  passwordForm: FormGroup;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public angularFireauth: AngularFireAuth,
    public formbuilder: FormBuilder,
    public alertCtrl: AlertController
  ) {
    this.passwordForm = this.formbuilder.group({
      email: [null, [Validators.required, Validators.email]]
    })
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

  resetPassword() {
    if(this.passwordForm.valid) {
      this.angularFireauth.auth.sendPasswordResetEmail(this.passwordForm.value.email)
      .then(() => {
        this.presentAlert('Enviado', 'Solitação de senha enviada com sucesso para seu email.');
        this.navCtrl.pop();
      })
      .catch((error: any) => {
        if(error.code == 'auth/user-not-found') {
          this.presentAlert('Erro', 'Usuário não encontrado');
        }
        else if (error.code == 'auth/invalid-email') {
          this.presentAlert('Erro', 'O email cadastrado é inválido.');
        }
      })
    }
  }

}
