import { Link, useNavigate } from "react-router-dom";
import { FaBell, FaUserShield, FaGraduationCap } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/');
    // Force reload to update Navbar state (simple way)
    window.location.reload();
  };

  return (
    <div className="navbar">
      <Link to="/" className="nav-title" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <FaGraduationCap size={28} />
        <span>College Placement Portal</span>
      </Link>

      <div className="nav-buttons">
        <button className="flex items-center gap-2">
          <FaBell /> <span>Notifications</span>
        </button>

        {isAdmin ? (
          <button onClick={handleLogout} className="flex items-center gap-2" style={{ background: '#fef2f2', color: '#dc2626' }}>
            <FaUserShield /> <span>Logout</span>
          </button>
        ) : (
          <button onClick={() => navigate('/admin/login')} className="flex items-center gap-2">
            <FaUserShield /> <span>Admin Login</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;