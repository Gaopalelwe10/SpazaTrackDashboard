import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { UserService } from 'src/app/services/user.service';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  spazacount = 0;
  usercount = 0;
  PChart = [];
  constructor(private afs: AngularFirestore) {
    
    this.afs.collection('spazashop').valueChanges().subscribe((data: any) => {
      this.spazacount = data.length;
      console.log(this.spazacount)
   

    this.afs.collection('users').valueChanges().subscribe((data: any) => {
      this.usercount = data.length;
      console.log(data.length)

      // console.log("genger "+ this.value)
      this.PChart = new Chart('PChart', {
        type: 'pie',
        data: {
          datasets: [{
            // label: 'Number of Users Registered Monthly',
            data: [this.usercount, this.spazacount],
            backgroundColor: [
              '#ffa726',
              '#66bb6a'
            ],
            label: 'Dataset 1'
          }],
          labels: [
            'Users',
            'Spaza'
          ]
        },
        options: {
          responsive: true
        }
      });

      // this.usercount = 0;
      // this.spazacount = 0;
    })
  })
  }

  ngOnInit() {
  }

}
