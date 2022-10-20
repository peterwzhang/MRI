import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";
import axios from "axios";
import { theme } from "../constants";
import { url } from "../api/constants";
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
const SpanButton = styled.span`
  cursor: pointer;
`;

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    axios.post(`${url}/logout`);
    router.push("/");
  };

  return (
    <NavbarFormat>
      <header>
        <div className={css.header}>
          <div className={css.button}>
            <span style={{ fontSize: "2rem", fontWeight: "bold" }}>
              <Link href="/">HPC Interface</Link>
            </span>
          </div>
          <div>
            <div className={css.button}>
              <span className={css.link}>
                <Link href="/dashboard">Dashboard</Link>
              </span>
            </div>
            <div className={css.button}>
              <span className={css.link}>
                <Link href="/create-batch">Create batch</Link>
              </span>
            </div>
            <div className={css.button}>
              <span className={css.link}>
                <Link href="/script-library">Script library</Link>
              </span>
            </div>
            <div className={css.button}>
              <span className={css.link}>
                <Link href="/view-batch">View batch</Link>
              </span>
            </div>
            <div className={css.button}>
              <span className={css.link}>
                <Link href="/view-job">View job</Link>
              </span>
            </div>
            <div className={css.button}>
              <span className={css.link}>
                <Link href="/account">Account</Link>
              </span>
            </div>
            <div className={css.button}>
              <SpanButton className={css.link} onClick={() => handleLogout()}>
                Sign out
              </SpanButton>
            </div>
          </div>
        </div>
      </header>
    </NavbarFormat>
  );
}
