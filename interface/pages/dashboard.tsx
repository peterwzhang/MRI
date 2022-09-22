import React from "react";
import Head from "next/head";
import HeroBanner from "../components/HeroBanner"
import BatchTable from '../components/BatchTable';
import Navbar from '../components/Navbar';
import SectionDiv from "../components/SectionDiv";
import styled from "styled-components";
import ProgressBar from "../components/ProgressBar";
import { theme } from "../constants";
import Popup from 'reactjs-popup';

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
                        <Button>Refresh</Button>
                        <Popup trigger={<Button>View</Button>} position="right center">
                            <h3>Snow Batch Information</h3>
                            <h4>ID: 1</h4>
                            <InfoTable>
                                <tr>
                                    <InfoHeader>Job</InfoHeader>
                                    <InfoHeader>Status</InfoHeader>
                                </tr>
                                <tr>
                                    <InfoCell>Sun</InfoCell>
                                    <InfoCell>Complete</InfoCell>
                                </tr>
                                <tr>
                                    <InfoCell>Rain</InfoCell>
                                    <InfoCell>Running</InfoCell>
                                </tr>
                                <tr>
                                    <InfoCell>Hail</InfoCell>
                                    <InfoCell>Failed</InfoCell>
                                </tr>
                            </InfoTable>
                        </Popup>
                        <Button>Cancel</Button>
                    </Buttons>
                </Wrapper>
            </SectionDiv>
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
const InfoTable = styled.table`
    border: 1px solid black;
`
const InfoHeader = styled.th`
    border: 1px solid black;
    textAlign: center;
`
const InfoCell = styled.td`
    border: 1px solid black;
    textAlign: left;
    padding: 5px;
`
const Button = styled.button`
    border-width: .05rem;
    border-radius: .5rem;
    padding: 1rem;
    width: 80%;
    font-size: 1rem;
`

