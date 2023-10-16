import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { useEffect } from 'react';
const Clusters = () => {
  // Data for low, medium, and high categories
  const getArrayFromLocalStorage = () => {
    const storedArray = JSON.parse(localStorage.getItem('array')) || [];
    return storedArray;
  };
  const storedArray = getArrayFromLocalStorage();

  var low = [];
  var medium = [];
  var high = [];

  //   useEffect(() => {
  //     //Runs only on the first render
  //   for(var i=0;i<storedArray.length;i++){
  //     if(storedArray[i]>=0&&storedArray[i]<10){
  //       low.push(storedArray[i]);
  //     }else if(storedArray[i]>=10&&storedArray[i]<=25){
  //         medium.push(storedArray[i]);
  //     }else{
  //       high.push(storedArray[i]);
  //     }
  //   }
  // }, []);


  for (var i = 0; i < storedArray.length; i++) {
    if (storedArray[i] > 0 && storedArray[i] < 10) {
      if (low.length != 3) {
        low.push(storedArray[i]);
      } else {
        low.shift();
        low.push(storedArray[i]);
      }
    } else if (storedArray[i] >= 10 && storedArray[i] < 25) {
      if (medium.length != 3) {
        medium.push(storedArray[i]);
      } else {
        medium.shift();
        medium.push(storedArray[i]);
      }
    } else {
      if (high.length != 3) {
        high.push(storedArray[i]);
      } else {
        high.shift();
        high.push(storedArray[i]);
      }
    }
  }



  const jsonArray1 = JSON.stringify(low);
  localStorage.setItem('low', jsonArray1);

  const jsonArray2 = JSON.stringify(medium);
  localStorage.setItem('medium', jsonArray2);

  const jsonArray3 = JSON.stringify(high);
  localStorage.setItem('high', jsonArray3);

  const data = {
    low,
    medium,
    high,
  };

  // Chart options
  const chartOptions = {
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ['low', 'medium', 'high'],
    },
    yaxis: {
      title: {
        text: 'Values',
      },
    },
  };

  // Chart series data
  const chartSeries = [
    {
      name: 'Low',
      data: data.low,
    },
    {
      name: 'Medium',
      data: data.medium,
    },
    {
      name: 'High',
      data: data.high,
    },
  ];

  return (
    <div>
      <ReactApexChart options={chartOptions} series={chartSeries} type="bar" height={350} width={700} />
    </div>
  );
};

export default Clusters;
