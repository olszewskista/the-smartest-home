import useMqtt from "../../hooks/useMqtt"

export default function Alarm() {
    const {mqttClient, mqttData} = useMqtt('ws://localhost:8000/mqtt', 'alarm')
    return (
        <div>
            <h1>Alarm</h1>
            {mqttData && (
                <div>
                    {mqttData.message !== 'status' ? mqttData.message : 'unknown'}
                </div>
            )}
            <div>
                <button onClick={() => mqttClient.publish('alarm', 'armed')}>Arm</button>
                <button onClick={() => mqttClient.publish('alarm', 'disarmed')}>Disarm</button>
            </div>
        </div>
    )
}