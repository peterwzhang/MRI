import React from "react";
import SectionDiv from "../components/SectionDiv";
import BatchSelect from "../components/BatchSelect";
import BatchInfo from "../components/BatchInfo";

export default function ViewBatch(){
    return(
        <div>
            <SectionDiv>
                <BatchSelect/>
            </SectionDiv>
            <SectionDiv>
                <BatchInfo/>
            </SectionDiv>
        </div>
    )
}

