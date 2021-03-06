import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(   
    private afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    private route :Router,
    
 
    ) { 
      afAuth.auth.onAuthStateChanged((user) => {
        if (user) {
          this.route.navigateByUrl('menu/home')
        } else {
          this.route.navigateByUrl('')
        }
      })
    }

    async login(email: string, password: string) {
      await this.afAuth.auth.signInWithEmailAndPassword(email, password).then((success) => {
        console.log(success);
      }).catch((err) => {
        // this.alertCtrl.create({
        //   // message: 'You can not order more than six',
        //   subHeader: err.message,
        //   buttons: ['Ok']
        // }).then(
        //   alert => alert.present()
        // );
      })
    }
     logout() {
       this.afAuth.auth.signOut().then((success) => {
        this.route.navigateByUrl('login').then(()=>{
          console.log("success");
          this.route.navigateByUrl('');
        })
        
      
     
      }).catch((error) => {
        console.log(error)
      })
    }
}
