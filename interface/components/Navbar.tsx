import Link from "next/link";
import styled from 'styled-components';
import React, { useState } from "react";
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
                        <Link href="/home">Home</Link>
                    </h3>
                </div>
                <div className="nav_button">
                    <h3 className="nav_link">
                        <Link href="/create-job">Create Job</Link>
                    </h3>
                </div>
                <div className="nav_button">
                    <h3 className="nav_link">
                        <Link href="/view-jobs">View Jobs</Link>
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