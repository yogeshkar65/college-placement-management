import { FaCalendarAlt, FaHistory, FaUserGraduate, FaBuilding } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../services/api";

import Shimmer from './Shimmer';

function Dashboard() {
  const [stats, setStats] = useState({
    companies: 0,
    upcomingDrives: 0,
    pastDrives: 0,
    placedStudents: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await API.get('/dashboard/stats');
        setStats(data);
        // Small delay to show off the nice shimmer (optional UX)
        setTimeout(() => setLoading(false), 800);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="fade-in" style={{ minHeight: '80vh' }}>
      {/* HERO SECTION */}
      <div className="hero">
        <h1>Welcome to College Placement Portal</h1>
        <p>
          Empowering students with career opportunities and industry connections
        </p>


        <div className="hero-buttons">
          <Link to="/upcoming" className="primary-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>View Upcoming Drives</Link>
          <Link to="/past" className="secondary-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>Explore Past Drives</Link>
        </div>
      </div>

      {/* STATS DASHBOARD */}
      <div className="dashboard">
        <Link to="/upcoming" className="stat-card green" style={{ textDecoration: 'none', display: 'block', cursor: 'pointer' }}>
          <FaCalendarAlt className="stat-icon" />
          <p>Upcoming Drives</p>
          {loading ? <Shimmer height="40px" width="60px" /> : <h2>{stats.upcomingDrives}</h2>}
        </Link>

        <Link to="/past" className="stat-card blue" style={{ textDecoration: 'none', display: 'block', cursor: 'pointer' }}>
          <FaHistory className="stat-icon" />
          <p>Past Drives</p>
          {loading ? <Shimmer height="40px" width="60px" /> : <h2>{stats.pastDrives}</h2>}
        </Link>

        <Link to="/placed" className="stat-card purple" style={{ textDecoration: 'none', display: 'block', cursor: 'pointer' }}>
          <FaUserGraduate className="stat-icon" />
          <p>Placed Students</p>
          {loading ? <Shimmer height="40px" width="60px" /> : <h2>{stats.placedStudents}</h2>}
        </Link>

        <Link to="/companies" className="stat-card orange" style={{ textDecoration: 'none', display: 'block', cursor: 'pointer' }}>
          <FaBuilding className="stat-icon" />
          <p>Companies</p>
          {loading ? <Shimmer height="40px" width="60px" /> : <h2>{stats.companies}</h2>}
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;