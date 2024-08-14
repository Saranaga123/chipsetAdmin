import { Component } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent {

  pieChartOptions: EChartsOption = {
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: 'Product Sold',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: 'Alienware x14' },
          { value: 735, name: 'Alienware x16' },
          { value: 580, name: 'Alienware m18' },
          { value: 484, name: 'Alienware m16' },
        ]
      }
    ]
  };
}
