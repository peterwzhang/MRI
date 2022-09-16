import React from "react";
import styles from '../styles/Home.module.css'
import Head from "next/head";
import Navbar from './Navbar';

export default function ViewJobs(){
    return(
        <div className={styles.main}>
            <Head>
            <title>View Jobs</title>
            <meta name="description" content="CS 495 Capstone project" />
            <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar/>
            <h1 className={styles.title}>View jobs here!</h1>
            <p>Future Content: table containing information about currently running jobs</p>
        </div>
    )
}