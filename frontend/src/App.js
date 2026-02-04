import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import UpcomingDrives from "./components/UpcomingDrives";
import PastDrives from "./components/PastDrives";
import "./index.css";

function App() {
  return (
    <>
      <Navbar />
      <div className="main-content">
        <Dashboard />
        <UpcomingDrives />
        <PastDrives />
      </div>
    </>
  );
}

export default App;