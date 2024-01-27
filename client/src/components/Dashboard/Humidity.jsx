import useMqtt from '../../hooks/useMqtt';

export default function Humidity() {
    const { mqttData } = useMqtt('ws://localhost:8000/mqtt', 'humidity');
    return (
        <div>
            <h1>Humidity</h1>
            {mqttData && (
                <div>
                    {mqttData.message !== 'status' ? mqttData.message : '0'}
                </div>
            )}
        </div>
    );
}
