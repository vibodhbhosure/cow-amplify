import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import Container from 'react-bootstrap/Container';
//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col'
import cowdash from './cowdash.png'; // Tell webpack this JS file uses this image

import Sensors from './components/sensorData';
import TemperatureCard from './components/TemperatureCard';
import { ApexChart } from './components/ApexChart'; // Replace './ApexChart' with the correct path to the component

import { Amplify } from 'aws-amplify'
import awsconfig from './aws-exports';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui/dist/styles.css';

import { Auth } from 'aws-amplify';

Amplify.configure(awsconfig);

Auth.currentCredentials().then(creds => console.log(creds));

async function signOut() {
  try {
    await Auth.signOut();
  } catch (error) {
    console.log('error signing out: ', error);
  }
}


function App() {
  return (
    <div className="App">
      <div className='ml-[1300px] mt-10'>
        <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded " onClick={signOut} >
          Signout
        </button>
      </div>
      
      <div className='w-[5px] ml-[550px] mt-[50px] text-center rounded-lg'>
         <Sensors name="temperature" unit="°C" />
      </div>
      
      
       <div className='ml-[320px] mt-10'>
         <ApexChart/>
       </div>
    </div>
  );
}

export default withAuthenticator(App, true);
//<div className='ml-[500px] mt-6'>
//<img src={cowdash} alt="cowimage" className="w-[500px] h-[400px]"/>;
//</div>