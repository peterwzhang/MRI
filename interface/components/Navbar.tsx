import Link from "next/link";
import styled from 'styled-components';
import React, { useState } from "react";

const Navbar = () => (
    <NavbarFormat>
        <header>
            <div className="nav_header">
                <div className="nav_button">
                <h1>
                    <Link href="/">MRIREDCapHPCHCPGUI</Link>
                </h1>
                </div>
                <div className="nav_button">
                    <h2 className="nav_link">
                        <Link href="/">Home</Link>
                    </h2>
                </div>
                <div className="nav_button">
                    <h2 className="nav_link">
                        <Link href="/create-job">Create Job</Link>
                    </h2>
                </div>
                <div className="nav_button">
                    <h2 className="nav_link">
                        <Link href="/view-jobs">View Jobs</Link>
                    </h2>
                </div>
            </div>
        </header>
    </NavbarFormat>
)

const NavbarFormat = styled.div`
  display: inline-block;
  vertical-align: middle;
  align-items: center;
  background: #9e1b32;
  min-height: 3rem;
  width: 100%;
  padding: .5rem 2rem;
`

export default Navbar;