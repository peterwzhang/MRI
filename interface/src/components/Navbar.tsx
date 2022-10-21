import { Link } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../constants";
import css from "./Navbar.module.scss";

const NavbarFormat = styled.div`
  display: inline-block;
  border-bottom: 0.25rem solid ${() => theme.PRIMARY};
  vertical-align: middle;
  align-items: center;
  color: ${() => theme.TERTIARY};
  min-height: 3rem;
  width: 100%;
  padding: 0 2rem;
`;

export default function Navbar() {
  return (
    <NavbarFormat>
      <header>
        <div className={css.header}>
          <div className={css.button}>
            <span style={{ fontSize: "2rem", fontWeight: "bold" }}>
              <Link to="/">HPC Interface</Link>
            </span>
          </div>
          <div className={css.rightBar}>
            <div className={css.button}>
              <Link to="/dashboard">Dashboard</Link>
            </div>
            <div className={css.button}>
              <Link to="/batch/create">Create batch</Link>
            </div>
            <div className={css.button}>
              <Link to="/script-library">Script library</Link>
            </div>
            {/* <div className={css.button}>
              <Link to="/view-batch">View batch</Link>
            </div>
            <div className={css.button}>
              <Link to="/view-job">View job</Link>
            </div> */}
            <Link to="/account">
              <img
                className="nav_right"
                src="/account_icon.png"
                alt="View Account Page"
                height={36}
                width={36}
              />
            </Link>
          </div>
        </div>
      </header>
    </NavbarFormat>
  );
}
