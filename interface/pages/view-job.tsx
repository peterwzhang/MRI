import React from "react";
import Prism from "react-syntax-highlighter";
import Navbar from '../components/Navbar';
import SectionDiv from "../components/SectionDiv";
import ProgressBar from "../components/ProgressBar";
import JobSelect from "../components/JobSelect";
import JobInfo from "../components/JobInfo";

export default function ViewJob(){

    return(
        <div>
            <Navbar/>
            <SectionDiv>
                <JobSelect/>
            </SectionDiv>
            <SectionDiv>
                <JobInfo/>
            </SectionDiv>
        </div>
    )
}