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
        <div className='bg-neutral-200 p-4 rounded shadow-md flex flex-col justify-center items-center'>
            <h1 className='font-bold'>Heater</h1>
            {mqttData && (
                <div className={mqttData.message === 'on' ? 'text-green-500' : 'text-red-500'}>
                    {mqttData.message !== 'status'
                        ? mqttData.message
                        : 'unknown'}
                </div>
            )}
            <div className='flex gap-2'>
                <button className='bg-green-300 p-1 rounded' onClick={handleTurnOn}>Turn On</button>
                <button className='bg-red-300 p-1 rounded' onClick={handleTurnOff}>Turn Off</button>
            </div>
        </div>
    );
}
