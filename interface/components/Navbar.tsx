import React from "react";
import Link from "next/link";
import styled from 'styled-components';
import { theme } from "../constants";

const Navbar = () => (
    <NavbarFormat>
        <header>
            <div className="nav_header">
                <div className="nav_button">
                <h1>
                    <Link href="/home">HPC Interface</Link>
                </h1>
                </div>
                <div className="nav_button">
                    <h3 className="nav_link">
                        <Link href="/dashboard">Dashboard</Link>
                    </h3>
                </div>
                <div className="nav_button">
                    <h3 className="nav_link">
                        <Link href="/create-batch">Create batch</Link>
                    </h3>
                </div>
                <div className="nav_button">
                    <h3 className="nav_link">
                        <Link href="/script-library">Script library</Link>
                    </h3>
                </div>
                <div className="nav_button">
                    <h3 className="nav_link">
                        <Link href="/view-batch">View batch</Link>
                    </h3>
                </div>
                <div className="nav_button">
                    <h3 className="nav_link">
                        <Link href="/view-job">View job</Link>
                    </h3>
                </div>
                <div className="nav_button">
                    <h3 className="nav_link">
                        <Link href="/">Sign out</Link>
                    </h3>
                </div>
            </div>
        </header>
    </NavbarFormat>
)

const NavbarFormat = styled.div`
  display: inline-block;
  border-bottom: .25rem solid ${() => theme.PRIMARY};
  vertical-align: middle;
  align-items: center;
  color: ${() => theme.TERTIARY};
  min-height: 3rem;
  width: 100%;
  padding: .5rem 2rem;
`

export default Navbar;