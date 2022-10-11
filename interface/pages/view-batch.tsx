import React from "react";
import Navbar from '../components/Navbar';
import SectionDiv from "../components/SectionDiv";
import BatchSelect from "../components/BatchSelect";

export default function ViewBatch(){
    return(
        <div>
            <Navbar/>
            <SectionDiv>
                <BatchSelect/>
            </SectionDiv>
        </div>
    )
}

