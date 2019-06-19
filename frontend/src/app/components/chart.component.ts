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
            let chart = new CanvasJS.Chart("chartContainer", {
                animationEnabled: true,
                exportEnabled: true,
                title: {
                    text: "Profile Views"
                },
                data: [{
                    type: "column",
                    dataPoints: [
                        { y: 2, label: "Wed, 13 Jun 2019" },
                        { y: 3, label: "Wed, 14 Jun 2019" },
                        { y: 5, label: "Wed, 15 Jun 2019" },
                        { y: 6, label: "Wed, 16 Jun 2019" },
                        { y: 4, label: "Wed, 17 Jun 2019" },
                        { y: 3, label: "Wed, 18 Jun 2019" },
                        { y: 1, label: "Wed, 19 Jun 2019" }
                    ]
                }]
            });
            chart.render();
      }, (err) => {
            console.log('error', err);
          });

        }
}
