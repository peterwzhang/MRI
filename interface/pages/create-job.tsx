import React from "react";
import Head from "next/head";
import HeroBanner from "../components/HeroBanner"
import JobForm from "../components/JobForm";
import Navbar from './Navbar';
import SectionDiv from "../components/SectionDiv";
import styles from '../styles/Home.module.css'

export default function CreateJob(){
    return(
        <div className={styles.main}>
            <Head>
            <title>Create a Job</title>
            <meta name="description" content="CS 495 Capstone project" />
            <link rel="icon" href="/favicon.ico" />
            </Head>
            <HeroBanner />
            <Navbar/>
            <h1 className={styles.title}>Create a job here!</h1>
            <p>Future Content: form with necessary parameters for starting jobs on HPC cluster</p>
            <SectionDiv>
            <JobForm />
            </SectionDiv>
        </div>
    )
}