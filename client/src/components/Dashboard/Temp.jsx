import useMqtt from '../../hooks/useMqtt';

export default function Temp() {
    const { mqttData } = useMqtt('ws://localhost:8000/mqtt', 'temp');

    return (
        <div className="bg-neutral-200 shadow-md p-4 rounded flex flex-col justify-center items-center">
            <h1 className='font-bold'>Temp</h1>
            {mqttData && (
                <p
                    className={
                        parseFloat(mqttData.message) <= 18
                            ? 'text-blue-500'
                            : parseFloat(mqttData.message) >= 23
                            ? 'text-red-500'
                            : 'text-green-500'
                    }
                >
                    {mqttData.message !== 'status'
                        ? mqttData.message + '°C'
                        : '0'}
                </p>
            )}
            {!mqttData && <p>0°C</p>}
        </div>
    );
}
