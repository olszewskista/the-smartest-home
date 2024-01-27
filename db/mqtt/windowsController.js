const mqtt = require('mqtt');

const client = mqtt.connect('ws://localhost:8000/mqtt');

let status = 'closed';

client.on('connect', () => {
    console.log('connected to mqtt - windows');
    client.subscribe('windows');
})

client.on('message', (topic, message) => {
    console.log(message.toString());
    if (message.toString() === 'status') {
        client.publish('windows', status);
    } else { 
        status = message.toString();
    }
})