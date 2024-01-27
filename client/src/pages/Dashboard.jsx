import Doors from '../components/Dashboard/Doors';
import Heater from '../components/Dashboard/Heater';
import Humidity from '../components/Dashboard/Humidity';
import Lights from '../components/Dashboard/Lights';
import Temp from '../components/Dashboard/Temp';
import Windows from '../components/Dashboard/Windows';
import Alarm from '../components/Dashboard/alarm';

export default function DashboardPage() {
    return (
        <>
            <h1 className="font-bold text-3xl text-center uppercase mb-2">
                Dashboard
            </h1>
            <div className="flex gap-4 justify-evenly items-center h-[60vh]">
                <div className='flex gap-2 flex-col'>
                    <Temp />
                    <Humidity />
                </div>
                <Heater />
                <Lights />
                <Windows />
                <Alarm />
                <Doors />
            </div>
        </>
    );
}
