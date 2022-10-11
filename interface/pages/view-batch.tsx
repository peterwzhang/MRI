import React from "react";
import Navbar from '../components/Navbar';
import SectionDiv from "../components/SectionDiv";
import BatchSelect from "../components/BatchSelect";
import BatchInfo from "../components/BatchInfo";

export default function ViewBatch(){
    return(
        <div>
            <Navbar/>
            <SectionDiv>
                <BatchSelect/>
            </SectionDiv>
            <SectionDiv>
                <BatchInfo/>
            </SectionDiv>
        </div>
    )
}

