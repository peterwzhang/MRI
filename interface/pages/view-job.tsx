import React from "react";
import Prism from "react-syntax-highlighter";
import Navbar from '../components/Navbar';
import SectionDiv from "../components/SectionDiv";
import ProgressBar from "../components/ProgressBar";
import styled from "styled-components";

export default function ViewJob(){

    return(
        <div>
            <Navbar/>
            <SectionDiv>
                <h1>View Job</h1>
                <label>Select job to view: </label>
                <select name="jobName">
                    <option value="slurm-job-test.sh">Job 1</option>
                </select>
                <h4></h4>
                <Button>Refresh Job Status</Button>
            </SectionDiv>
            <SectionDiv>
                <h3>Member Batch</h3>
                <p>Snow</p>
                <h3>Job Status</h3>
                <p>In Progress</p>
                <h3>Job Progress</h3>
                <ProgressBar/>
                <h3>Current Runtime</h3>
                <p>100 hours</p>
                <h3>Job Log (last 50KB)</h3>
                <Prism>Example: analyzing image 29</Prism>
                <Prism>Example: running Job 1</Prism>
                <Prism>Example: Job 0 completed. Starting new job now</Prism>
            </SectionDiv>
        </div>
    )
}

const Button = styled.button`
    border-width: .05rem;
    border-radius: .5rem;
    padding: 1rem;
    width: 20%;
    font-size: 1rem;
`