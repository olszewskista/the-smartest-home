const mqtt = require('mqtt');

const client = mqtt.connect('ws://localhost:8000/mqtt');

let temp = 22;
let heater = false;

function getRandom(min, max) {
    return (Math.random() * (max - min) + min).toFixed(1);
}

client.on('connect', () => {
    console.log('connected to mqtt');
    client.subscribe('heater');
    client.subscribe('temp');
    setInterval(() => {
        if (heater) {
            temp = (temp - getRandom(-0.5, -0.2)).toFixed(1);
            temp = temp > 30 ? 30 : temp;
        } else {
            temp = (temp - getRandom(-0.2, 0.5)).toFixed(1);
            temp = temp < 15 ? 15 : temp;
        }
        client.publish('temp', `${temp}`);
    }, 5000);
})

client.on('message', (topic, message) => {
    console.log(message.toString());
    if (message.toString() === 'on') {
        heater = true;
    } else if (message.toString() === 'off') {
        heater = false;
    } else if (topic === 'temp' && message.toString() === 'status') {
        client.publish('temp', `${temp}`);
    }
});