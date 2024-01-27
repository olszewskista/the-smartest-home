import useMqtt from "../../hooks/useMqtt"

export default function Alarm() {
    const {mqttClient, mqttData} = useMqtt('ws://localhost:8000/mqtt', 'alarm')
    return (
        <div className="bg-neutral-200 p-4 rounded flex flex-col justify-center items-center shadow-md">
            <h1 className="font-bold">Alarm</h1>
            {mqttData && (
                <div className={mqttData.message === 'armed' ? 'text-green-500' : 'text-red-500'}>
                    {mqttData.message !== 'status' ? mqttData.message : 'unknown'}
                </div>
            )}
            <div className="flex gap-2">
                <button className='bg-green-300 p-2 rounded' onClick={() => mqttClient.publish('alarm', 'armed')}>Arm</button>
                <button className='bg-red-300 p-2 rounded' onClick={() => mqttClient.publish('alarm', 'disarmed')}>Disarm</button>
            </div>
        </div>
    )
}