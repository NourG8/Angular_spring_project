import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";
import { Router } from '@angular/router';
import { CourService } from 'src/app/cour.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;

  public countCours: any;
  public countClasses: any;
  public countModules: any;
  public countProfs: any;
  public countEtudiants: any;
  public dataModules: any;

  public numberOfCoursesPerModule: any;
  public labelsOfCoursesPerModule: any;

  public numberOfProfPerModule: any;
  public labelsOfProfsPerModule: any;

  constructor(private router: Router,private courService: CourService) { }

  ngOnInit() {
    this.courService.getCountCourses().subscribe(data => {
      this.countCours = data
      console.log(data);
    })

    this.courService.getCountClasses().subscribe(data => {
      this.countClasses = data
      console.log(data);
    })

    this.courService.getCountProfs().subscribe(data => {
      this.countProfs = data
      console.log(data);
    })


    this.courService.getCountEtudiants().subscribe(data => {
      this.countEtudiants = data
      console.log(data);
    })

    this.courService.getCountModules().subscribe(data => {
      this.countModules = data
      console.log(data);
    })

    this.courService.getAllModulesWithCours().subscribe(data => {
      this.dataModules = data;
      this.numberOfCoursesPerModule = this.dataModules.map(module => module.cours.length);
      this.labelsOfCoursesPerModule = this.dataModules.map(module => module.nomModule);

      var ordersChart = new Chart(chartOrders, {
        type: 'bar',
        // type: 'doughnut',
        options: chartExample2.options,
        datasets: this.datasets[0],
        data: {
          // labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5' ],
          labels: this.labelsOfCoursesPerModule,
          datasets: [{
            data: this.numberOfCoursesPerModule,
            backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#e7e9ed'],
            borderColor: '#fff',
            borderWidth: 1
          }]
        },
      });
    });

    this.courService.getAllProfsWithModules().subscribe(data => {
      this.dataModules = data;
      this.numberOfProfPerModule = this.dataModules.map(module => module.modules.length);
      this.labelsOfProfsPerModule = this.dataModules.map(module => module.nom);

      this.salesChart = new Chart(chartSales, {
        // type: 'line',
        type: 'doughnut',
        options: chartExample1.options,
        data: {
          labels: this.labelsOfProfsPerModule,
          datasets: [{
            data:this.numberOfProfPerModule,
            backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#e7e9ed', '#4e73df', '#1cc88a', '#f78fb3', '#a8b9ff', '#f7d2d2'],
            borderColor: '#fff',
            borderWidth: 1
          }]
        },
      });
    })


    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];


    var chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());


    // var ordersChart = new Chart(chartOrders, {
    //   type: 'bar',
    //   // type: 'doughnut',
    //   options: chartExample2.options,
    //   data: {
    //     // labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5' ],
    //     labels: this.labelsOfCoursesPerModule,
    //     datasets: [{
    //       data: this.numberOfCoursesPerModule,
    //       backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#e7e9ed'],
    //       borderColor: '#fff',
    //       borderWidth: 1
    //     }]
    //   },
    // });

    var chartSales = document.getElementById('chart-sales');

    // this.salesChart = new Chart(chartSales, {
		// 	// type: 'line',
    //   type: 'doughnut',
		// 	options: chartExample1.options,
    //   data: {
    //     labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5', 'Label 6', 'Label 7', 'Label 8', 'Label 9'],
    //     datasets: [{
    //       data: [0, 20, 10, 30, 15, 40, 20, 60, 60],
    //       backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#e7e9ed', '#4e73df', '#1cc88a', '#f78fb3', '#a8b9ff', '#f7d2d2'],
    //       borderColor: '#fff',
    //       borderWidth: 1
    //     }]
    //   },
		// });
  }


  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

}
