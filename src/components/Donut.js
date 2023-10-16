// import React, { useState } from 'react';
// import ReactApexChart from 'react-apexcharts';

// export function Donut(props) {

//   const { array0, array1,array2,array3,array4 } = props;
//   const [chartData] = useState({

//     chart: {
//         type: 'bar',
//         height: 350,
//       },
//       plotOptions: {
//         bar: {
//           horizontal: true,
//           isFunnel: true,
//         },
//       },
//       series: [
//         {
//           name: "Funnel Series",
//           data: [
//             {
//               x: "Sourced",
//               y: array0
//             },
//             {
//               x: "Assessed",
//               y: array1
//             },
//             {
//               x: "Technical",
//               y: array2
//             },
//             {
//               x: "Offered",
//               y: array3
//             },
//             {
//                 x:"offered",
//                 y:array4
//             }
//           ],
//         },
//       ]
    
// //     series: [
// //       {
// //         name: "Desktops",
// //        // data: [36,37.20, 37.60, 38.13, 38.62, 38.83, 39.10, 39.25, 40, 41, 42, 43],
// //        data:[array0,array1,array2,array3,array4]
// //       }
// //     ],

// //     options :{
// //         chart: {
// //           type: 'donut'
// //         },
// //         fill: {
// //             colors: ['#f00']
// //           },
// //         plotOptions: {
// //           bar: {
// //             horizontal: true,
// //           }
// //         },
// //       }
      
// //   });
    

//   return (
//     <div id="chart" >
//       <ReactApexChart options={chartData.options} series={chartData.series.data.y} type="bar" height={350} width={700}/>
//     </div>
//   );
// }
