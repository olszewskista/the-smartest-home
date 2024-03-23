const mqtt = require('mqtt');

const client = mqtt.connect('ws://mqtt:8000/mqtt');

let humidity = 50;
let heater;

function getRandom(min, max) {
    return (Math.random() * (max - min) + min).toFixed(1);
}

client.on('connect', () => {
    console.log('connected to mqtt');
    client.subscribe('heater');
    client.subscribe('humidity');
    setInterval(() => {
        if (heater) {
            humidity = (humidity - getRandom(-1, 5)).toFixed(1);
            humidity = humidity < 15 ? 15.0 : humidity;
        } else {
            humidity = (humidity - getRandom(-1, -3)).toFixed(1);
            humidity = humidity > 80 ? 80.0 : humidity;
        }
        client.publish('humidity', `${humidity}`);
    }, 5000);
})

client.on('message', (topic, message) => {
    console.log(message.toString());
    if (message.toString() === 'on') {
        heater = true;
    } else if (message.toString() === 'off') {
        heater = false;
    } else if (topic === 'humidity' && message.toString() === 'status') {
        client.publish('humidity', `${humidity}`);
    }
});