import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
// import { useCallback } from 'react';
import { Amplify } from 'aws-amplify';
import awsconfig from './../aws-exports';
import '@aws-amplify/ui/dist/styles.css';
import { ApexChart } from './ApexChart';
import { BarChart } from './BarChart';
import { PubSub, Auth } from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub/lib/Providers';


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
            arrays: [10, 20, 30, 40, 50],
            shouldRender: true
        };
    }

    componentDidMount() {
        this.setState({ shouldRender: false });
        PubSub.subscribe('device/12/data').subscribe({
            next: data => {
                try {
                    this.setState({ sensorMsg: data.value, arrays: this.state.arrays.slice(-4).concat([parseInt(data.value.temperature)]) });

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


        var temp = `${sensorData > 40 ? 'danger' : 'Normal'}`;
        var back = temp === "Normal" ? 'green' : 'red';

        return (
            <>
                <div className="Sensor">

                    <Card style={{ width: '18rem', backgroundColor: `${back}`, color: "white", marginBottom: "30px" }} >
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
                        {/* <button style={{ color: "white", margin: "10px", backgroundColor: "blue" }} onClick={move}>Add</button> */}
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


                <div className='ml-[320px] mt-10' style={{ display: "flex", alignContent: "center", justifyContent: "space-around", width: "350px", margin: "auto", flexWrap: "wrap" }}>
                    <ApexChart args={this.state.arrays} />
                    <BarChart args={this.state.arrays} />
                </div>
            </>
        )
    }
}

export default Sensors;
