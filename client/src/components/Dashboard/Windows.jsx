import useMqtt from "../../hooks/useMqtt"

export default function Windows() {
    const {mqttClient, mqttData} = useMqtt('ws://localhost:8000/mqtt', 'windows')
    return (
        <div>
            <h1>Windows</h1>
            {mqttData && (
                <div>
                    {mqttData.message !== 'status' ? mqttData.message : 'unknown'}
                </div>
            )}
            <div>
                <button onClick={() => mqttClient.publish('windows', 'open')}>Open</button>
                <button onClick={() => mqttClient.publish('windows', 'closed')}>Close</button>
            </div>
        </div>
    )
}