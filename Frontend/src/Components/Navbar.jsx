import "./Navbar.css";

const Navbar = () => {
  const userName = localStorage.getItem("userName");
  const formatteduserName = userName ? userName.toUpperCase() : "GUEST";
  return (
    <div className="navbar">
      <div className="navbar-left">
        <span className="navbar-badge">Rational Academy SMS</span>
        <h2>Welcome, <span>{formatteduserName}</span></h2>
      </div>

      <div className="navbar-right">
        <div className="navbar-status-badge">
          <span className="status-dot"></span>
          Active Session
        </div>
      </div>
    </div>
  );
};

export default Navbar;