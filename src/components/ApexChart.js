import React, { useState,useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

export function ApexChart() {
   
  // const [myArray, setMyArray] = useState([]);

  // useEffect(() => {
  //   // Retrieve the array from localStorage
  //   var storedArray = JSON.parse(localStorage.getItem('array')) || [];
  //   console.log(storedArray[2]);
    
  // //var { storedArray[0], storedArray[1],storedArray[2],storedArray[3],storedArray[4]} = props;
  //   setMyArray(storedArray);
  // }, []);

  // const saveArrayToLocalStorage = (array) => {
  //   localStorage.setItem('array', JSON.stringify(array));
  // };

  // const updateArray = () => {
  //   const newArray = [...myArray]; // Update the array as needed
  //   setMyArray(newArray);
  //   saveArrayToLocalStorage(newArray);
  // };


  const getArrayFromLocalStorage = () => {
    const storedArray = JSON.parse(localStorage.getItem('array')) || [];
    return storedArray;
  };
  const storedArray = getArrayFromLocalStorage();
 // const { array0,array1,array2,array3,array4 } = props;
     
 

  const [chartData] = useState({
    series: [
      {
        name: "Desktops",
       // data: [36,37.20, 37.60, 38.13, 38.62, 38.83, 39.10, 39.25, 40, 41, 42, 43]
       data:[storedArray[0],storedArray[1],storedArray[2],storedArray[3],storedArray[4]]
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
        categories: ['normal', 'normal', 'normal', 'normal', 'normal', 'normal','high','high','very-high','risk','risk'],
      }
    }
  });

  return (
    <>
    <div id="chart">
      <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={350} width={700}/>
    </div>
    </>
  );
}
