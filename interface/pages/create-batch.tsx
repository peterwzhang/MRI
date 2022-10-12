import React from "react";
import BatchForm from "../components/BatchForm";
import Navbar from '../components/Navbar';
import SectionDiv from "../components/SectionDiv";

export default function CreateBatch(){
    return(
        <div>
            <SectionDiv>
                <BatchForm />
            </SectionDiv>
        </div>
    )
}