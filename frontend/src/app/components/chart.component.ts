import { Component, OnInit } from '@angular/core';
import * as CanvasJS from './js/canvasjs.min';
import { GetUsersService } from '../services/getusers.service';

@Component({
  selector: 'chart-component',
  template: `

  <div id="chartContainer" style="height: 370px; width: 100%;"></div>

  `,
  styles: ['h3, h5 { font-weight: 300; }']
})
export class ChartComponent implements OnInit {
    constructor(private getDataService: GetUsersService) {

    }

    ngOnInit() {
        this.getDataService.countByJob().subscribe((res: any) => {
            console.log('hey',res);
            let chart = new CanvasJS.Chart("chartContainer", {
                animationEnabled: true,
                exportEnabled: true,
                title: {
                    text: "Workers by jobs"
                },
                data: [{
                    type: "column",
                    dataPoints: [
                        { y: 2, label: "Backend developer" },
                        { y: 3, label: "Barista" },
                        { y: 5, label: "Dentist" },
                        { y: 1, label: "Gardener" },
                        { y: 4, label: "Lawyer" },
                        { y: 1, label: "Web designer" }
                    ]
                }]
            });
            chart.render();
   
      }, (err) => {
            //this.getDataService.emitLoadding(false);
            console.log('error', err);
          });

        }
}
