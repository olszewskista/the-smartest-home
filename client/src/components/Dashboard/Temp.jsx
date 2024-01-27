import useMqtt from "../../hooks/useMqtt"

export default function Temp() {
    const {mqttData} = useMqtt('ws://localhost:8000/mqtt', 'temp')

    return (
        <div>
            <h1>Temp</h1>
            {mqttData && <p>{mqttData.message !== 'status' ? mqttData.message : '0'}</p>}
            {!mqttData && <p>0</p>}
        </div>
    )
}