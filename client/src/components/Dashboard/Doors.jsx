import useMqtt from "../../hooks/useMqtt"

export default function Doors() {
    const {mqttClient, mqttData} = useMqtt('ws://localhost:8000/mqtt', 'doors')
    return (
        <div className="flex flex-col bg-neutral-200 p-4 rounded shadow-md items-center justify-center">
            <h1 className="font-bold">Doors</h1>
            {mqttData && (
                <div className={mqttData.message === 'open' ? 'text-green-500' : 'text-red-500'}>
                    {mqttData.message !== 'status' ? mqttData.message : 'unknown'}
                </div>
            )}
            <div className="flex gap-2">
                <button className='bg-green-300 p-2 rounded' onClick={() => mqttClient.publish('doors', 'open')}>Open</button>
                <button className='bg-red-300 p-2 rounded' onClick={() => mqttClient.publish('doors', 'closed')}>Close</button>
            </div>
        </div>
    )
}