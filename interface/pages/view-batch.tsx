import React, { useState } from "react";
import SectionDiv from "../components/SectionDiv";
import BatchSelect from "../components/BatchSelect";
import BatchInfo from "../components/BatchInfo";
import { BatchMetadataWithId } from "../types";

export default function ViewBatch(){
    const [batch, setBatch] = useState<BatchMetadataWithId | undefined>(undefined)

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
