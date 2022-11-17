import { Link } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../constants";
import AccountMenu from "./AccountMenu";
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
              <Link to="/">Dashboard</Link>
            </div>
            <div className={css.button}>
              <Link to="/batch/new">Create batch</Link>
            </div>
            <div className={css.button}>
              <Link to="/scripts">Script library</Link>
            </div>
            <div className={css.button}>
              <Link to="/help">Help</Link>
            </div>
            <AccountMenu />
          </div>
        </div>
      </header>
    </NavbarFormat>
  );
}
