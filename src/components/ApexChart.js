import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

export function ApexChart(props) {

  const [chartData, setchartData] = useState({
    series: [
      {
        name: "Temperature",
        data: props.args
      }
    ],
    options: {
      chart: {
        height: 70,
        width: 70,
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
        categories: ['normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'high', 'high', 'very-high', 'risk', 'risk'],
      }
    }
  });


  useEffect(() => {
    setchartData(() => ({
      series: [
        {
          name: "Temperature",
          data: props.args
        }
      ],
      options: {
        chart: {
          height: 70,
          width: 70,
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
          categories: ['1', '2', '3', '4', '5'],
        }
      }
    }));
  }, [props.args]);

  return (
    <>
      <div id="chart">
        <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={350} width={700} />
      </div>
    </>
  );
}
