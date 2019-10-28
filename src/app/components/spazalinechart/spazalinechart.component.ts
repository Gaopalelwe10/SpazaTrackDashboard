import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-spazalinechart',
  templateUrl: './spazalinechart.component.html',
  styleUrls: ['./spazalinechart.component.scss'],
  providers: [DatePipe]
})
export class SpazalinechartComponent implements OnInit {
  labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  LineChart = [];
  date = [];
 
  value: string;

  Jan = 0;
  Feb = 0;
  Mar = 0;
  Apr = 0;
  May = 0;
  June = 0;
  July = 0;
  Aug = 0;
  Sept = 0;
  Oct = 0;
  Nov = 0;
  Dec = 0;


  public data = []
  constructor( private afs: AngularFirestore,
    public datepipe: DatePipe) { 
      this.afs.collection('spazashop').valueChanges().subscribe((data: any) => {
        data.forEach(element => {
          this.value = this.datepipe.transform(element.Timestamp, 'MMM');
  
          if (this.value === 'Jan') {
            this.Jan++;
          }
  
          if (this.value === 'Feb') {
            this.Feb++;
          }
  
          if (this.value === "Mar") {
            this.Mar++;
          }
          if (this.value === "Apr") {
            this.Apr++;
          }
          if (this.value === "May") {
            this.May++;
          }
          if (this.value === "Jun") {
            this.June++;
          }
          if (this.value === "Jul") {
            this.July++;
          }
          if (this.value === "Aug") {
            this.Aug++;
          }
          if (this.value === "Sep") {
            this.Sept++;
          }
          if (this.value === "Oct") {
            this.Oct++;
          }
          if (this.value === "Nov") {
            this.Nov++;
          }
          if (this.value === "Dec") {
            this.Dec++;
          }
          console.log(this.value)
        });
        
        this.LineChart = new Chart('lineChart2', {
          type: 'line',
          data: {
            labels: this.labels ,
            datasets: [{
              label: 'Number of Spaza Registered Monthly',
              data: [this.Jan, this.Feb, this.Mar, this.Apr, this.May, this.June, this.July, this.Aug, this.Sept, this.Oct, this.Nov, this.Dec],
              fill: true,
              lineTension: 0.2,
              borderColor: "blue",
              backgroundColor: '#6faeb7',
              borderWidth: 1
            }]
            
          },
          options: {
            title: {
              text: "Line Chart",
              display: true
            },
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        });
        this.value=null
        this.Jan = 0;
        this.Feb = 0;
        this.Mar = 0;
        this.Apr = 0;
        this.May = 0;
        this.June = 0;
        this.July = 0;
        this.Aug = 0;
        this.Sept = 0;
        this.Oct = 0;
        this.Nov = 0;
        this.Dec = 0;
      })
  
    }

  ngOnInit() {
  }

}
