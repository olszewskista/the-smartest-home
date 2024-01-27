import useMqtt from '../../hooks/useMqtt';

export default function Humidity() {
    const { mqttData } = useMqtt('ws://localhost:8000/mqtt', 'humidity');
    return (
        <div className="bg-neutral-200 p-4 shadow-md rounded flex flex-col justify-center items-center">
            <h1 className='font-bold'>Humidity</h1>
            {mqttData && (
                <div
                    className={
                        parseFloat(mqttData.message) < 60 &&
                        parseFloat(mqttData.message) > 30
                            ? 'text-green-500'
                            : 'text-red-500'
                    }
                >
                    {mqttData.message !== 'status'
                        ? mqttData.message + '%'
                        : '0%'}
                </div>
            )}
        </div>
    );
}
