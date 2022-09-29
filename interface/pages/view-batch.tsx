import React from "react";
import Navbar from '../components/Navbar';
import SectionDiv from "../components/SectionDiv";

export default function ViewBatch(){
    return(
        <div>
            <Navbar/>
            <SectionDiv>
                <h1>View Batch</h1>
                <label>Select batch to view:</label>
                <select name="batchName">
                    <option value="slurm-test.sh">Slurm Test</option>
                </select>
            </SectionDiv>
        </div>
    )
}

