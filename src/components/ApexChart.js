import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

export function ApexChart() {
  const [chartData] = useState({
    series: [
      {
        name: "Desktops",
        data: [36,37.20, 37.60, 38.13, 38.62, 38.83, 39.10, 39.25, 40, 41, 42, 43]
      }
    ],
    options: {
      chart: {
        height: 150,
        width: 150,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: 'Temperature Graph',
        align: 'left'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5
        },
      },
      xaxis: {
        categories: ['normal', 'normal', 'normal', 'normal', 'normal', 'normal','high','high','very-high','risk','risk'],
      }
    }
  });

  return (
    <div id="chart">
      <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={350} width={700}/>
    </div>
  );
}
