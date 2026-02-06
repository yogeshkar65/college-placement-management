import Dashboard from "./Dashboard";
import UpcomingDrives from "./UpcomingDrives";
import PastDrives from "./PastDrives";
import PlacedStudents from "./PlacedStudents";
import CompanyList from "./CompanyList";

function Home() {
    return (
        <>
            <Dashboard />
            <UpcomingDrives isPreview={true} />
            <PastDrives isPreview={true} />
            <PlacedStudents isPreview={true} />
            <CompanyList isPreview={true} />
        </>
    );
}

export default Home;
