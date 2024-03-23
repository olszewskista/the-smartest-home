const mqtt = require('mqtt');

const client = mqtt.connect('ws://mqtt:8000/mqtt');

let color;

client.on('connect', () => {
    console.log('connected to mqtt - lights');
    client.subscribe('lights');
})

client.on('message', (topic, message) => {
    console.log(message.toString());
    if (message.toString() === 'status') {
        console.log('gitddd')
        client.publish('lights', color);
    } else { 
        color = message.toString();
    }
});