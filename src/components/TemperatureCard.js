import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { PubSub } from 'aws-amplify';

function TemperatureCard(props) {
  const [sensorMsg, setSensorMsg] = useState('{"temperature": 0}');

  useEffect(() => {
    const subscription = PubSub.subscribe('device/12/data').subscribe({
      next: (data) => {
        try {
          const parsedData = JSON.parse(data.value);
          setSensorMsg(parsedData);
        } catch (error) {
          console.log('Error parsing data:', error);
        }
      },
      error: (error) => console.error(error),
      close: () => console.log('Done'),
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const { temperature } = sensorMsg;
  const cardStyle = {
    backgroundColor: temperature > 39 ? 'red' : 'green',
  };

  const status = temperature > 39 ? 'Risk' : 'Normal';

  return (
    <div className="TemperatureCard">
      <Card style={{ width: '18rem', ...cardStyle }}>
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>
            {status} ({temperature} {props.unit})
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default TemperatureCard;
