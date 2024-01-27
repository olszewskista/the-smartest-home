import useMqtt from "../../hooks/useMqtt"

export default function Windows() {
    const {mqttClient, mqttData} = useMqtt('ws://localhost:8000/mqtt', 'windows')
    return (
        <div className="flex flex-col justify-center items-center bg-neutral-200 rounded shadow-md p-4 gap-1">
            <h1 className="font-bold">Windows</h1>
            {mqttData && (
                <div className={mqttData.message === 'open' ? 'text-green-500' : 'text-red-500'}>
                    {mqttData.message !== 'status' ? mqttData.message : 'unknown'}
                </div>
            )}
            <div className="flex gap-2">
                <button className="bg-green-300 p-2 rounded" onClick={() => mqttClient.publish('windows', 'open')}>Open</button>
                <button className='bg-red-300 p-2 rounded' onClick={() => mqttClient.publish('windows', 'closed')}>Close</button>
            </div>
        </div>
    )
}