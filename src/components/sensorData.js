import React from 'react';
import Card from 'react-bootstrap/Card';
// import { useCallback } from 'react';
import { Amplify } from 'aws-amplify';
import awsconfig from './../aws-exports';
import '@aws-amplify/ui/dist/styles.css';
import { ApexChart } from './ApexChart';
import { BarChart } from './BarChart';
import { PubSub, Auth } from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub/lib/Providers';
import Clusters from './Clusters';

Amplify.configure(awsconfig);

// Apply plugin with configuration
Amplify.addPluggable(new AWSIoTProvider({
    aws_pubsub_region: 'eu-west-1',
    aws_pubsub_endpoint: 'wss://a2mrsxwmzefujy-ats.iot.eu-west-1.amazonaws.com/mqtt',
}));



class Sensors extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sensorMsg: '{"null": 0}',
            arrays: [12, 23, 34, 35, 40],
            shouldRender: true
        };
    }

    componentDidMount() {
        this.setState({ shouldRender: false });
        PubSub.subscribe('device/12/data').subscribe({
            next: data => {
                try {
                    this.setState({ sensorMsg: data.value });
                } catch (error) {
                    console.log("Error, are you sending the correct data?");
                }
            },
            error: error => console.error(error),
            close: () => console.log('Done'),
        });
    }

    render() {
        const { sensorMsg } = this.state;
        let sensorData = parseFloat(sensorMsg[this.props.name]);
        if (!isNaN(sensorData)) {
            sensorData = sensorData.toFixed(2); // Format to two decimal places
        }

        const { arrays } = this.state;

        var temp = `${sensorData > 39 ? 'danger' : 'Normal'}`;





        const move = (ev) => {
            ev.preventDefault();

            //Runs only on the first render
            // convert array to JSON string using JSON.stringify()


            const jsonArray = JSON.stringify(arrays);

            // save to localStorage using "array" as the key and jsonArray as the value
            localStorage.setItem('array', jsonArray);

            // get the JSON string from localStorage
            const str = localStorage.getItem('array');

            // convert JSON string to relevant object
            const parsedArray = JSON.parse(str);

            console.log(parsedArray);
            console.log("added", { arrays });

            temp = sensorData
            if (arrays.length != 5) {
                arrays.push(+temp);
            } else {
                arrays.shift();
                arrays.push(+temp);
            }
        };




        var back = temp === "Normal" ? 'green' : 'red';

        return (
            <>
                <div className="Sensor">

                    <Card style={{ width: '18rem', backgroundColor: `${back}`, color: "white",marginBottom:"30px" }} >
                        <Card.Body>
                            <Card.Title>{this.props.name}</Card.Title>
                            <Card.Text>
                                {sensorData}{this.props.unit}
                            </Card.Text>
                            <Card.Title>Status</Card.Title>
                            <Card.Text>
                                {temp}
                            </Card.Text>
                        </Card.Body>
                        <button style={{ color: "white",margin:"10px",backgroundColor:"blue" }} onClick={move}>add</button>
                    </Card>
                    <style jsx>{
                        `
                .Sensor {
                        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
                        transition: 0.3s;
                    }
                    
                    .Sensor:hover {
                        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
                    }
                    `
                    }
                    </style>
                </div>


                <div className='ml-[320px] mt-10' style={{ display: "flex", alignContent: "center", justifyContent: "space-around", width: "350px",margin:"auto",flexWrap:"wrap"}}>
                    <ApexChart />
                    <BarChart />
                    <Clusters/>
                </div>
            </>
        )
    }
}

export default Sensors;
