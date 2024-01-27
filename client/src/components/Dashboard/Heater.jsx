import { useEffect } from 'react';
import useMqtt from '../../hooks/useMqtt';

export default function Heater() {
    const { mqttClient, mqttData } = useMqtt(
        'ws://localhost:8000/mqtt',
        'heater'
    );
    useEffect(() => {
        if (mqttClient) {
            mqttClient.publish('heater', 'status');
        }
    }, [mqttClient]);
    function handleTurnOn() {
        mqttClient.publish('heater', 'on');
    }
    function handleTurnOff() {
        mqttClient.publish('heater', 'off');
    }
    return (
        <div>
            <h1>Heater</h1>
            {mqttData && (
                <div>
                    {mqttData.message !== 'status'
                        ? mqttData.message
                        : 'unknown'}
                </div>
            )}
            <div>
                <button onClick={handleTurnOn}>Turn On</button>
                <button onClick={handleTurnOff}>Turn Off</button>
            </div>
        </div>
    );
}
