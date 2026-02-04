import { FaCalendarAlt, FaHistory, FaUserGraduate, FaBuilding } from "react-icons/fa";

function Dashboard() {
  return (
    <>
      {/* HERO SECTION */}
      <div className="hero">
        <h1>Welcome to SIET Placement Portal</h1>
        <p>
          Empowering students with career opportunities and industry connections
        </p>

        <div className="hero-buttons">
          <button className="primary-btn">View Upcoming Drives</button>
          <button className="secondary-btn">Explore Past Drives</button>
        </div>
      </div>

      {/* STATS DASHBOARD */}
      <div className="dashboard">
        <div className="stat-card green">
          <FaCalendarAlt className="stat-icon" />
          <p>Upcoming Drives</p>
          <h2>8</h2>
        </div>

        <div className="stat-card blue">
          <FaHistory className="stat-icon" />
          <p>Past Drives</p>
          <h2>6</h2>
        </div>

        <div className="stat-card purple">
          <FaUserGraduate className="stat-icon" />
          <p>Placed Students</p>
          <h2>5</h2>
        </div>

        <div className="stat-card orange">
          <FaBuilding className="stat-icon" />
          <p>Companies</p>
          <h2>6</h2>
        </div>
      </div>
    </>
  );
}

export default Dashboard;