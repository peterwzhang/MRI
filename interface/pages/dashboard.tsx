import React from "react";
import Head from "next/head";
import HeroBanner from "../components/HeroBanner"
import BatchTable from '../components/BatchTable';
import Navbar from '../components/Navbar';
import SectionDiv from "../components/SectionDiv";
import styled from "styled-components";
import ProgressBar from "../components/ProgressBar";
import { theme } from "../constants";

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
            <RowWrapper>
                <Widget>
                    <h2>Batches</h2>
                    <ProgressBar/>
                    <Wrapper>
                        <BatchTable />   
                        <Buttons>
                            <Button>View</Button>
                            <Button>Cancel</Button>
                            <Button>Refresh</Button>
                        </Buttons>
                    </Wrapper>
                </Widget>
                <Widget>
                    <h2>Batch Information</h2>
                    <h4>Snow; ID: 1</h4>
                </Widget>
            </RowWrapper>
        </div>
    )
}

const RowWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`
const Widget = styled(SectionDiv)`
    margin: 2rem;
`
const Wrapper = styled(RowWrapper)`
    gap: 4rem;
`
const Buttons = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 20rem;
`
const Button = styled.button`
    border-width: .05rem;
    border-radius: .5rem;
    padding: 1rem;
    width: 80%;
    font-size: 1rem;
`

