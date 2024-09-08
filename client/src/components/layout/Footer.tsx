import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import logo from "../../assets/logo.png";

function Footer() {
  return (
    <footer className="d-flex flex-wrap justify-content-between align-items-center p-3 border-top">
      <div className="col-md-4 d-flex align-items-center">
        <Link
          to="/"
          className="mb-0 me-2 text-body-secondary text-decoration-none lh-1"
        >
          <img
            src={logo}
            alt="Logo"
            width="30"
            height="30"
            className="d-inline-block align-text-top"
          />
        </Link>
        <span className="mb-0 text-body-secondary">
          SIMC 25<sup>th</sup>
        </span>
      </div>

      <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
        <li className="ms-3">
          <a
            className="text-body-secondary"
            href="https://www.facebook.com/sirirajmedcamp25th"
          >
            <Icon
              icon="ant-design:facebook-filled"
              width={30}
              height={30}
            />
          </a>
        </li>
        <li className="ms-3">
          <a
            className="text-body-secondary"
            href="https://www.instagram.com/sirirajmedcamp25th"
          >
            <Icon
              icon="ant-design:instagram-filled"
              width={30}
              height={30}
            />
          </a>
        </li>
        <li className="ms-3">
          <a
            className="text-body-secondary"
            href="https://www.tiktok.com/@sirirajmedicalcamp"
          >
            <Icon
              icon="ant-design:tik-tok-filled"
              width={30}
              height={30}
            />
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
