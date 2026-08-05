import "./Navbar.css";

const Navbar = () => {
  const userName = localStorage.getItem("userName");
    const formatteduserName =  userName.toUpperCase();
  return (
    <div className="navbar">

      <h2>Welcome {formatteduserName}</h2>

      <div>
        Admin
      </div>

    </div>
  );
};

export default Navbar;