import React from 'react';
import ReactApexChart from 'react-apexcharts';

const Clusters = () => {
  // Data for low, medium, and high categories
  const getArrayFromLocalStorage = () => {
    const storedArray = JSON.parse(localStorage.getItem('array')) || [];
    return storedArray;
  };
  const storedArray = getArrayFromLocalStorage();
  const data = {
    low: [10, 20, 15, 25, 30],
    medium: [40, 30, 45, 35, 40],
    high: [30, 50, 35, 40, 25],
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
      categories: ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'],
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
      <ReactApexChart options={chartOptions} series={chartSeries} type="bar"  height={350} width={700} />
    </div>
  );
};

export default Clusters;
