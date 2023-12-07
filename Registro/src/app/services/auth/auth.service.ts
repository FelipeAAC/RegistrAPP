import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  recoverEmailPassword(email: string): Observable<void> {
    return new Observable<void>(observer => {
      this.auth.sendPasswordResetEmail(email).then(() => {
        observer.next();
        observer.complete();
      }).catch(error => {
        observer.error(error);
        observer.complete();
      });
    });
  }

  login(email: string, password: string): Observable<User> {
    return new Observable<User>(observer => {
      this.auth.signInWithEmailAndPassword(email, password)
        .then((firebaseUserCredential) => {
          const firebaseUser = firebaseUserCredential.user;
          if (firebaseUser) {
            observer.next({ email, id: firebaseUser.uid });
            observer.complete();
          } else {
            observer.error('User is null');
          }
        }).catch(error => {
          observer.error(error);
          observer.complete();
        });
    });
  }
}
