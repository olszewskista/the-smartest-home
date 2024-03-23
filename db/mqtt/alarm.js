const mqtt = require('mqtt');

const client = mqtt.connect('ws://mqtt:8000/mqtt');

let status = 'armed'

client.on('connect', () => {
    console.log('connected to mqtt - alarm');
    client.subscribe('alarm');
})

client.on('message', (topic, message) => {
    console.log(message.toString());
    if (message.toString() === 'status') {
        client.publish('alarm', status);
    } else if (message.toString() === 'armed') {
        status = 'armed'
        client.publish('windows', 'closed')
        client.publish('doors', 'closed')
    } else if (message.toString() === 'disarmed') {
        status = 'disarmed'
    }
})