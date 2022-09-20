import React from "react";
import Head from "next/head";
import HeroBanner from "../components/HeroBanner"
import JobTable from '../components/JobTable';
import Navbar from '../components/Navbar';
import SectionDiv from "../components/SectionDiv";

export default function ViewJobs(){
    return(
        <div>
            <Head>
                <title>View Jobs</title>
                <meta name="description" content="CS 495 Capstone project" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <HeroBanner />
            <Navbar/>
            <SectionDiv>
                <JobTable />   
            </SectionDiv>
        </div>
    )
}