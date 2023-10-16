import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

export function BarChart() {

  
  const getArrayFromLocalStorage = () => {
    const storedArray = JSON.parse(localStorage.getItem('array')) || [];
    return storedArray;
  };
  const storedArray = getArrayFromLocalStorage();

  //const { array0, array1,array2,array3,array4 } = props;
  const [chartData] = useState({
    series: [
      {
        name: "Desktops",
       // data: [36,37.20, 37.60, 38.13, 38.62, 38.83, 39.10, 39.25, 40, 41, 42, 43],
       data:[storedArray[0],storedArray[1],storedArray[2],storedArray[3],storedArray[4]]
      }
    ],

    options :{
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
        },
        // series: [{
        //   data: [{
        //     x: 'category A',
        //     y: 10,
        //   }, {
        //     x: 'category B',
        //     y: 18
        //   }, {
        //     x: 'category C',
        //     y: 13
        //   }]
        // }]
      }
      
  });

  return (
    <div id="chart" >
      <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} width={700}/>
    </div>
  );
}
