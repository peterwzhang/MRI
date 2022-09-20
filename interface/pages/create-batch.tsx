import React from "react";
import Head from "next/head";
import HeroBanner from "../components/HeroBanner";
import BatchForm from "../components/BatchForm";
import Navbar from '../components/Navbar';
import SectionDiv from "../components/SectionDiv";

export default function CreateBatch(){
    return(
        <div>
            <Head>
                <title>Create a Batch</title>
                <meta name="description" content="CS 495 Capstone project" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <HeroBanner />
            <Navbar/>
            <SectionDiv>
                <BatchForm />
            </SectionDiv>
        </div>
    )
}