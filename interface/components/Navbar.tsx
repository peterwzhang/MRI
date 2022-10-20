import React from "react";
import Link from "next/link";
import styled from 'styled-components';
import { theme } from "../constants";

const Navbar = () => {

    return (
        <NavbarFormat>
            <header>
                <div className="nav_header">
                        <h3 className="nav_big"><Link href="/">HPC Interface</Link></h3>
                        <h3><Link href="/dashboard">Dashboard</Link></h3>
                        <h3><Link href="/create-batch">Create batch</Link></h3>
                        <h3><Link href="/script-library">Script library</Link></h3>
                        <h3><Link href="/view-batch">View batch</Link></h3>
                        <h3><Link href="/view-job">View job</Link></h3>
                        <Link href="/account">
                            <img className="nav_right" src="/account_icon.png" alt="View Account Page" height="36"/>
                        </Link>
                </div>
            </header>
        </NavbarFormat>
    )
};

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
const H3_button = styled.h3`
    cursor: pointer;
`

export default Navbar;
