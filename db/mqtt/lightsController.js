const mqtt = require('mqtt');

const client = mqtt.connect('ws://localhost:8000/mqtt');

let color;

client.on('connect', () => {
    console.log('connected to mqtt - lights');
    client.subscribe('lights/status');
    client.subscribe('lights/set');
})

client.on('message', (topic, message) => {
    console.log(message.toString());
    if (topic === 'lights/status') {
        client.publish('lights/color', color);
    } else if (topic === 'lights/set') { 
        color = message.toString();
        client.publish('lights/color', color);
    }
});