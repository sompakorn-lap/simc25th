import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container-fluid">
        <Link
          className="navbar-brand mx-auto"
          to="/"
        >
          <img
            src={logo}
            alt="Logo"
            width="30"
            height="30"
            className="d-inline-block align-text-top"
          />
          SIMC 25<sup>th</sup>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
