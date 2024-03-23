const mqtt = require('mqtt');

const client = mqtt.connect('ws://mqtt:8000/mqtt');

let status = 'closed';

client.on('connect', () => {
    console.log('connected to mqtt - doors');
    client.subscribe('doors');
})

client.on('message', (topic, message) => {
    console.log(message.toString());
    if (message.toString() === 'status') {
        client.publish('doors', status);
    } else { 
        status = message.toString();
    }
})