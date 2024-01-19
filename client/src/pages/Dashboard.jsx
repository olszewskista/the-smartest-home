import Heater from "../components/Dashboard/Heater";
import Temp from "../components/Dashboard/Temp";

export default function DashboardPage() {
    
    return (
        <div>
            <h1>Dashboard</h1>
            <Temp />
            <Heater />
        </div>
    );
}
