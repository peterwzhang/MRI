import React from "react";
import Navbar from '../components/Navbar';
import SectionDiv from "../components/SectionDiv";

export default function ViewJob(){

    return(
        <div>
            <Navbar/>
            <SectionDiv>
                <h1>View Job</h1>
                <label>Select job to view:</label>
                <select name="jobName">
                    <option value="slurm-job-test.sh">Job 1</option>
                </select>
            </SectionDiv>
        </div>
    )
}

