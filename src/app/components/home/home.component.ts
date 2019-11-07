import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { element } from '@angular/core/src/render3';
import { UserService } from 'src/app/services/user.service';
import { SpazaService } from 'src/app/services/spaza.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  users = 0;
  spazas = 0;
  value: any;
  Male = 0;
  Female = 0;
  
  constructor(private afs: AngularFirestore, private userService: UserService, private spazaService: SpazaService) {
    this.userService.getUsersV().subscribe((data: any) => {
      this.users=data.length

      data.forEach(element => {
        this.value = element.gender;

        if (this.value === 'Male') {
          this.Male++;
        }

        if (this.value === 'Female') {
          this.Female++;
        }

      })

      this.value=null;
    
    })


    this.spazaService.getSpazasMap().subscribe((data:any) => {
        this.spazas=data.length
    })
  
  }

  ngOnInit() {

  
  }

}
