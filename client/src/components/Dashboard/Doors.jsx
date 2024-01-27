import useMqtt from "../../hooks/useMqtt"

export default function Doors() {
    const {mqttClient, mqttData} = useMqtt('ws://localhost:8000/mqtt', 'doors')
    return (
        <div>
            <h1>Doors</h1>
            {mqttData && (
                <div>
                    {mqttData.message !== 'status' ? mqttData.message : 'unknown'}
                </div>
            )}
            <div>
                <button onClick={() => mqttClient.publish('doors', 'open')}>Open</button>
                <button onClick={() => mqttClient.publish('doors', 'closed')}>Close</button>
            </div>
        </div>
    )
}