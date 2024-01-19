const mqtt = require('mqtt');

const client = mqtt.connect('ws://localhost:8000/mqtt');

let isAcive = false;

client.on('connect', () => {
    console.log('connected to mqtt - heater');
    client.subscribe('heater');
})

client.on('message', (topic, message) => {
    if (message.toString() === 'on') {
        isAcive = true;
    } else if (message.toString() === 'off') {
        isAcive = false;
    } else if (message.toString() === 'status') {
        client.publish('heater', isAcive ? 'on' : 'off');
    }
})