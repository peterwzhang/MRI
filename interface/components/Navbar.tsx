import React from "react";
import Link from "next/link";
import styled from 'styled-components';
import { theme } from "../constants";
import { useRouter } from "next/router";
import { url } from "../api/constants";
import axios from "axios";

const Navbar = () => {
    const router = useRouter()

    const handleLogout = () => {
        axios.post(`${url}/logout`)
        router.push('/')
    }

    return (
        <NavbarFormat>
            <header>
                <div className="nav_header">
                    <div className="nav_button">
                    <h1>
                        <Link href="/">HPC Interface</Link>
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
                            <Link href="/me">View job</Link>
                        </h3>
                    </div>
                    <div className="nav_button">
                        <H3_button className="nav_link" onClick={() => handleLogout()}>
                            Sign out
                        </H3_button>
                    </div>
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
