import { useState } from "react";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(menuOpen => !menuOpen);
  };
  const toggleUserMenu = () => {
    setUserMenuOpen(userMenuOpen => !userMenuOpen);
  };


  return (
    <>
      <nav className="site-navbar">
        <div className="nav-left">
          <button className="burger-icon" onClick={toggleMenu}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
          <div className={`menu-links ${menuOpen ? "open" : ""}`}>
            <NavLink to="/" className=" font-bold" onClick={() => setMenuOpen(false)} >
              Home
            </NavLink>
            <NavLink to="/about" className="font-bold" onClick={() => setMenuOpen(false)} >
              About
            </NavLink >
            {isLoggedIn && <NavLink to="/favorites" className="font-bold" onClick={() => setMenuOpen(false)} >Favorites</NavLink>}
            {isLoggedIn && user?.isBusiness && (
              <>
                <NavLink to="/my-cards" className="font-bold" onClick={() => setMenuOpen(false)} >My Cards</NavLink >
                <NavLink to="/create-card" className="font-bold" onClick={() => setMenuOpen(false)} >Create Card</NavLink>
              </>
            )}
          </div>
        </div>
        <div className="nav-right">
          {!isLoggedIn && <NavLink to="/login" className="font-bold" >Login</NavLink>}
          {isLoggedIn && (
            <div className="user-menu" onClick={toggleUserMenu}>
              <FaUserCircle />
              <div className={`user-menu-content ${userMenuOpen ? "open" : ""}`}>
                <button className="user-name-button mt-1 " onClick={() => navigate("/profile")}>
                  {user && `${user.name.first.charAt(0).toUpperCase() + user.name.first.slice(1)} ${user.name.last.charAt(0).toUpperCase() + user.name.last.slice(1)}`}
                </button>
                <button onClick={() => { logout(); navigate("/"); }}>
                  Logout
                </button>
              </div>
            </div>
          )}
          <div>
         
          </div>
          <div>
         
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
