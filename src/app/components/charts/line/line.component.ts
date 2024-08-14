import { Component } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
})
export class LineComponent {


  lineChartOptions: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    xAxis: {
      type: 'category',
      data: ['JAN', 'FEB', 'MAR', 'APR', 'MAY','JUN', 'JUL', 'AUG','SEP', 'OCT', 'NOV', 'DEC' ]
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [250, 100, 224, 218, 135, 147, 260,224, 218,150,180,300],
        type: 'line'
      }
    ]
  };


}
