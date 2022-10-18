import React, { useState } from "react";
import Link from "next/link";
import BatchTable from '../components/BatchTable';
import SectionDiv from "../components/SectionDiv";
import styled from "styled-components";
import ProgressBar from "../components/ProgressBar";
import JobsTable from "../components/JobsTable";

export default function Dashboard(){
    const [hide, setHide] = useState(true);

    return(
        <div>
            <RowWrapper>
                <Widget>
                    <h2>Batches</h2>
                    <ProgressBar/>
                    <Wrapper>
                        <BatchTable />   
                        <Buttons>
                            <Button onClick={() => setHide(!hide)}>View</Button>
                            <Button>Cancel</Button>
                            <Button>Refresh</Button>
                        </Buttons>
                    </Wrapper>
                </Widget>
                {!hide && (
                    <Widget>
                        <h2>Batch Information</h2>
                        <p>ID: 1</p>
                        <p>Name: Snow</p>
                        <p>Total runtime: 1hr 3s</p>
                        <p>Script used: Abide Organizer</p>
                        {/* <JobsTable/> */}
                        <br></br>
                        <Link href="/view-job">
                            <Button style={{ width: 400 }}>View Job</Button>
                        </Link>
                    </Widget>
                )}
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
    min-width: 30%;
    padding-bottom: 1rem;
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

