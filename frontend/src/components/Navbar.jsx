import { FaBell, FaUserShield } from "react-icons/fa";

function Navbar() {
  return (
    <div className="navbar">
      <h2 className="nav-title">
        Sri Shakthi Institute of Engineering and Technology
      </h2>

      <div className="nav-buttons">
        <button>
          <FaBell /> <span>Notifications</span>
        </button>

        <button>
          <FaUserShield /> <span>Admin Login</span>
        </button>
      </div>
    </div>
  );
}

export default Navbar;