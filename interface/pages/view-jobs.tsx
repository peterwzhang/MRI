import React from "react";
import Head from "next/head";
import HeroBanner from "../components/HeroBanner"
import JobTable from '../components/JobTable';
import Navbar from '../components/Navbar';
import SectionDiv from "../components/SectionDiv";
import styles from '../styles/Home.module.css'

export default function ViewJobs(){
    return(
        <div className={styles.main}>
            <Head>
            <title>View Jobs</title>
            <meta name="description" content="CS 495 Capstone project" />
            <link rel="icon" href="/favicon.ico" />
            </Head>
            <HeroBanner />
            <Navbar/>
            <h1 className={styles.title}>View jobs here!</h1>
            <p>Future Content: table containing information about currently running jobs</p>
            <SectionDiv>
            <JobTable />
            </SectionDiv>
        </div>
    )
}