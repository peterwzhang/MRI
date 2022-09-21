import React from "react";
import Head from "next/head";
import HeroBanner from "../components/HeroBanner"
import BatchTable from '../components/BatchTable';
import Navbar from '../components/Navbar';
import SectionDiv from "../components/SectionDiv";
import styled from "styled-components";
import ProgressBar from "../components/ProgressBar";

export default function Dashboard(){
    return(
        <div>
            <Head>
                <title>Dashboard</title>
                <meta name="description" content="CS 495 Capstone project" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <HeroBanner />
            <Navbar/>
            <SectionDiv>
                <h1>Batches</h1>
                <ProgressBar/>
                <Wrapper>
                    <BatchTable />   
                    <Buttons>
                        <Button>Cancel</Button>
                        <Button>Refresh</Button>
                        <Button>View</Button>
                    </Buttons>
                </Wrapper>
            </SectionDiv>
        </div>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 4rem;
`
const Buttons = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 20rem;
`
const Button = styled.button`
    border: none;
    height: 4rem;
    font-size: 1em;
`

