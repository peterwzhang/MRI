import React, { useState } from "react";
import SectionDiv from "../components/SectionDiv";
import BatchSelect from "../components/BatchSelect";
import BatchInfo from "../components/BatchInfo";
import { BatchMetadata } from "../types";

export default function ViewBatch(){
    const [batch, setBatch] = useState<BatchMetadata | undefined>(undefined)
    console.log(batch)

    return(
        <div>
            <SectionDiv>
                <BatchSelect setBatch={setBatch}/>
            </SectionDiv>
            {batch && 
                <SectionDiv>
                    <BatchInfo batch={batch}/>
                </SectionDiv>
            }
        </div>
    )
}
