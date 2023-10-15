import React from 'react';
import Card from 'react-bootstrap/Card';

import { Amplify } from 'aws-amplify';
import awsconfig from './../aws-exports';
import '@aws-amplify/ui/dist/styles.css';

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
            sensorMsg: '{"null": 0}'
        };
    }

    componentDidMount() {
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

        return (
            <div className="Sensor">
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>{this.props.name}</Card.Title>
                        <Card.Text>
                            {sensorData} {this.props.unit}
                        </Card.Text>
                    </Card.Body>
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
        )
    }
}

export default Sensors;
