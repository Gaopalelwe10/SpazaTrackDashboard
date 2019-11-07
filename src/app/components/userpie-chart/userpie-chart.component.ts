import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { UserService } from 'src/app/services/user.service';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-userpie-chart',
  templateUrl: './userpie-chart.component.html',
  styleUrls: ['./userpie-chart.component.scss']
})
export class UserpieChartComponent implements OnInit {

  pieChart = [];
  date = [];

  value: string;
  Male = 0;
  Female = 0;
  Other = 0;
  constructor(private afs: AngularFirestore) {

    this.afs.collection('users').valueChanges().subscribe((data: any) => {
      data.forEach(element => {
        this.value = element.gender;

        if (this.value === 'Male') {
          this.Male++;
        }

        if (this.value === 'Female') {
          this.Female++;
        }
        if (this.value === 'Other') {
          this.Other++;
        }

        // console.log("genger "+ this.value)
      });

      this.pieChart = new Chart('pieChart', {
        type: 'pie',
        data: {
       
          datasets: [{
            // label: 'Number of Users Registered Monthly',
            data: [this.Male, this.Female, this.Other],
            backgroundColor: [
              '#e4a9a8',
              '#26c6da',
              'yellow'
            ],
            label: 'Dataset 1'
          }],
          labels: [
            'Male',
            'Female',
            'Other'
          ]

        },
        options: {
          responsive: true
        }
      });
      
      this.value = null
      this.Male = 0;
      this.Female = 0;
      this.Other=0;
    })
  }

  ngOnInit() {
  }

}
