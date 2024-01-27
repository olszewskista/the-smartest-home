import Heater from "../components/Dashboard/Heater";
import Humidity from "../components/Dashboard/Humidity";
import Lights from "../components/Dashboard/Lights";
import Temp from "../components/Dashboard/Temp";

export default function DashboardPage() {
    
    return (
        <div style={{display: 'flex', gap: '2rem'}}>
            {/* <h1>Dashboard</h1> */}
            <Temp />
            <Heater />
            <Lights />
            <Humidity />
        </div>
    );
}
