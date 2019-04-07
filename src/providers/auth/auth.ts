import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';



@Injectable()
export class AuthProvider {

  user: Observable<firebase.User>;
  constructor(public angularFireauth: AngularFireAuth) {
    this.user = angularFireauth.authState;
  }


}