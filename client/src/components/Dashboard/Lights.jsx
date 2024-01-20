import { useEffect, useState } from "react"
import useMqtt from "../../hooks/useMqtt"


export default function Lights() {
    const [color, setColor] = useState('#000000')
    const {mqttClient, mqttData} = useMqtt('ws://localhost:8000/mqtt', 'lights/color')
    useEffect(() => {
        if (mqttClient) {
            mqttClient.publish('lights/status', 'status');
        }
    }, [mqttClient])
    function handleColor() {
        mqttClient.publish('lights/set', color);
    }
    return (
        <div>
            <h1>Lights</h1>
            {mqttData && <p style={{backgroundColor: mqttData.message}}>{mqttData.message}</p>}
            <div>
                <input type="color" name="color" id="color" value={color} onChange={(e) => setColor(e.target.value)} />
                <button onClick={handleColor}>Set Color</button>
            </div>
        </div>
    )
}