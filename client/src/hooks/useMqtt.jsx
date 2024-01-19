import { useState, useEffect } from 'react';
import mqtt from 'mqtt';

const useMqtt = (brokerUrl, topic) => {
    const [mqttClient, setMqttClient] = useState(null);
    const [mqttData, setMqttData] = useState(null);

    useEffect(() => {
        const client = mqtt.connect(brokerUrl);

        client.on('connect', () => {
            console.log('Connected to MQTT broker');
            client.subscribe(topic);
        });

        client.on('message', (receivedTopic, message) => {
            setMqttData({ topic: receivedTopic, message: message.toString() });
        });

        setMqttClient(client);

        return () => {
            if (client) {
                client.end();
            }
        };
    }, [brokerUrl, topic]);

    return { mqttClient, mqttData };
};

export default useMqtt;
