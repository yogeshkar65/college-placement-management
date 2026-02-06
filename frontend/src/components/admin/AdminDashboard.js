import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaCalendarAlt, FaHistory, FaUserGraduate, FaBuilding } from "react-icons/fa";
import API from '../../services/api';
import Shimmer from '../Shimmer';

function AdminDashboard() {
    const navigate = useNavigate();
    const location = useLocation();
    const [stats, setStats] = useState({
        companies: 0,
        upcomingDrives: 0,
        pastDrives: 0,
        placedStudents: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const isAdmin = localStorage.getItem('isAdmin');
        if (!isAdmin) {
            navigate('/admin/login');
        }

        // Fetch stats
        const fetchStats = async () => {
            try {
                const { data } = await API.get('/dashboard/stats');
                setStats(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching dashboard stats:", error);
                setLoading(false);
            }
        };

        fetchStats();
    }, [navigate, location.pathname]); // Re-fetch on navigation changes (like after adding items)


    const isOverview = location.pathname === '/admin/dashboard' || location.pathname === '/admin/dashboard/';

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', fontFamily: '"Poppins", sans-serif' }}>

            {/* 1. HEADER */}
            <div style={{
                background: '#166534',
                color: 'white',
                padding: '15px 30px',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                marginBottom: '30px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '24px' }}>🛡️</span>
                    <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Admin Dashboard</h1>
                </div>
            </div>

            {/* 2. STATS CARDS (Clickable for Delete/Manage) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '40px' }}>

                {/* Upcoming Drives Card */}
                <Link to="/upcoming" style={{ textDecoration: 'none' }}>
                    <div className="admin-stat-card admin-card-green">
                        <div>
                            <p style={{ color: '#6b7280', fontSize: '14px', margin: 0, fontWeight: '500' }}>Upcoming Drives</p>
                            <h2 style={{ fontSize: '32px', color: '#166534', margin: '5px 0 0 0' }}>{loading ? <Shimmer height="40px" width="60px" /> : stats.upcomingDrives}</h2>
                        </div>
                        <div style={{ background: '#f0fdf4', padding: '12px', borderRadius: '10px' }}>
                            <FaCalendarAlt size={24} color="#166534" />
                        </div>
                    </div>
                </Link>

                {/* Past Drives Card */}
                <Link to="/past" style={{ textDecoration: 'none' }}>
                    <div className="admin-stat-card admin-card-blue">
                        <div>
                            <p style={{ color: '#6b7280', fontSize: '14px', margin: 0, fontWeight: '500' }}>Past Drives</p>
                            <h2 style={{ fontSize: '32px', color: '#1d4ed8', margin: '5px 0 0 0' }}>{loading ? <Shimmer height="40px" width="60px" /> : stats.pastDrives}</h2>
                        </div>
                        <div style={{ background: '#eff6ff', padding: '12px', borderRadius: '10px' }}>
                            <FaHistory size={24} color="#1d4ed8" />
                        </div>
                    </div>
                </Link>

                {/* Placed Students Card */}
                <Link to="/placed" style={{ textDecoration: 'none' }}>
                    <div className="admin-stat-card admin-card-purple">
                        <div>
                            <p style={{ color: '#6b7280', fontSize: '14px', margin: 0, fontWeight: '500' }}>Placed Students</p>
                            <h2 style={{ fontSize: '32px', color: '#7e22ce', margin: '5px 0 0 0' }}>{loading ? <Shimmer height="40px" width="60px" /> : stats.placedStudents}</h2>
                        </div>
                        <div style={{ background: '#f3e8ff', padding: '12px', borderRadius: '10px' }}>
                            <FaUserGraduate size={24} color="#7e22ce" />
                        </div>
                    </div>
                </Link>

                {/* Companies Card */}
                <Link to="/companies" style={{ textDecoration: 'none' }}>
                    <div className="admin-stat-card admin-card-orange">
                        <div>
                            <p style={{ color: '#6b7280', fontSize: '14px', margin: 0, fontWeight: '500' }}>Companies</p>
                            <h2 style={{ fontSize: '32px', color: '#c2410c', margin: '5px 0 0 0' }}>{loading ? <Shimmer height="40px" width="60px" /> : stats.companies}</h2>
                        </div>
                        <div style={{ background: '#ffedd5', padding: '12px', borderRadius: '10px' }}>
                            <FaBuilding size={24} color="#c2410c" />
                        </div>
                    </div>
                </Link>
            </div>

            {/* 3. ACTION BUTTONS */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '40px', flexWrap: 'wrap' }}>
                <Link to="/admin/add-company" style={{ textDecoration: 'none' }}>
                    <button style={{
                        background: '#15803d',
                        color: 'white',
                        border: 'none',
                        padding: '12px 24px',
                        borderRadius: '30px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}>
                        <FaBuilding /> Add Company
                    </button>
                </Link>

                <Link to="/admin/add-drive" style={{ textDecoration: 'none' }}>
                    <button style={{
                        background: '#15803d',
                        color: 'white',
                        border: 'none',
                        padding: '12px 24px',
                        borderRadius: '30px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}>
                        <FaCalendarAlt /> Add Drive
                    </button>
                </Link>

                <Link to="/admin/add-student" style={{ textDecoration: 'none' }}>
                    <button style={{
                        background: '#15803d',
                        color: 'white',
                        border: 'none',
                        padding: '12px 24px',
                        borderRadius: '30px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}>
                        <FaUserGraduate /> Add Student
                    </button>
                </Link>
            </div>

            {/* 4. WELCOME CARD / OUTLET */}
            {isOverview ? (
                <div style={{
                    background: 'white',
                    borderRadius: '20px',
                    padding: '60px 20px',
                    textAlign: 'center',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
                    maxWidth: '600px',
                    margin: '0 auto'
                }}>
                    <div style={{ fontSize: '48px', marginBottom: '10px' }}>👋</div>
                    <h2 style={{ fontSize: '32px', color: '#166534', margin: '0 0 10px 0' }}>Welcome Admin</h2>
                    <p style={{ color: '#6b7280', fontSize: '16px' }}>
                        Select an option above to get started with managing the placement portal.
                    </p>
                </div>
            ) : (
                <div style={{ background: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                    <Outlet />
                </div>
            )}

        </div>
    );
}

export default AdminDashboard;
