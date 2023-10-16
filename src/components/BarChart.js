import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

export function BarChart(props) {

  const [chartData, setchartData] = useState({
    series: [
      {
        name: "Temperature",
        data: props.args
      }
    ],
    options: {
      chart: {
        type: 'bar'
      },
      fill: {
        colors: ['#f00']
      },
      plotOptions: {
        bar: {
          horizontal: true,
        }
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
          type: 'bar'
        },
        fill: {
          colors: ['#f00']
        },
        plotOptions: {
          bar: {
            horizontal: true,
          }
        }
      }
    }));
  }, [props.args]);


  return (
    <div id="chart" >
      <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} width={700} />
    </div>
  );
}
