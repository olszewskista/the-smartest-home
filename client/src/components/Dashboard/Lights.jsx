import { useEffect, useState } from 'react';
import useMqtt from '../../hooks/useMqtt';

export default function Lights() {
    const [color, setColor] = useState('#000000');
    const { mqttClient, mqttData } = useMqtt(
        'ws://localhost:8000/mqtt',
        'lights'
    );
    function handleColor() {
        mqttClient.publish('lights', color);
    }
    return (
        <div className='flex flex-col items-center justify-center p-4 bg-neutral-200 shadow-md gap-1 rounded'>
            <h1 className='font-bold'>Lights</h1>
            {mqttData && (
                <>
                <p>Current color:</p>
                <p className='w-full h-6' style={{ backgroundColor: mqttData.message }}>
                    {mqttData.message !== 'status'
                        ? ''
                        : 'unknown'}
                </p>
                </>
            )}
            <div className='flex gap-2'>
                <input
                    type="color"
                    name="color"
                    id="color"
                    value={color}
                    className='h-10'
                    onChange={(e) => setColor(e.target.value)}
                />
                <button className='bg-orange-300 p-2 rounded' onClick={handleColor}>Set Color</button>
            </div>
        </div>
    );
}
