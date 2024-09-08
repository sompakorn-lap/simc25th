import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container-fluid">
        <Link
          className="navbar-brand mx-auto d-flex align-items-center"
          to="/"
        >
          <img
            src={logo}
            alt="Logo"
            width="55"
            height="55"
            className="d-inline-block align-text-top"
          />
          <h3 className="my-auto mx-2">
            SIMC 25<sup>th</sup>
          </h3>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
