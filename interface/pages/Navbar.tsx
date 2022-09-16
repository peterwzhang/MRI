import Link from "next/link";
import styles from "../styles/Home.module.css";
import React, { useState } from "react";

const Navbar = () => {
    return(
        <header>
            <h1>
                <Link href="/">HPC Job Tracking</Link>
            </h1>
            <h2>
                <Link href="/">Home</Link>
            </h2>
            <h2>
                <Link href="/create-job">Create Job</Link>
            </h2>
            <h2>
                <Link href="/view-jobs">View Jobs</Link>
            </h2>
        </header>
    )
}

export default Navbar;