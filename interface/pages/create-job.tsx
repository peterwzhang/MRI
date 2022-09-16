import React from "react";
import Head from "next/head";
import HeroBanner from "../components/HeroBanner"
import JobForm from "../components/JobForm";
import Navbar from '../components/Navbar';
import SectionDiv from "../components/SectionDiv";

export default function CreateJob(){
    return(
        <div>
            <Head>
                <title>Create a Job</title>
                <meta name="description" content="CS 495 Capstone project" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <HeroBanner />
            <Navbar/>
            <SectionDiv>
                <JobForm />
            </SectionDiv>
        </div>
    )
}