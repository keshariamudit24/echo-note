import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">EchoNote</Link>
      </div>
      <div className="nav-links">
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/signup" className="nav-link button">Sign Up</Link>
      </div>
    </nav>
  );
}

export default Navbar;
