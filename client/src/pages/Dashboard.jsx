import Heater from "../components/Dashboard/Heater";
import Lights from "../components/Dashboard/Lights";
import Temp from "../components/Dashboard/Temp";

export default function DashboardPage() {
    
    return (
        <div>
            <h1>Dashboard</h1>
            <Temp />
            <Heater />
            <Lights />
        </div>
    );
}
