import React from "react";
import Navbar from '../components/Navbar';
import SectionDiv from "../components/SectionDiv";

export default function ScriptLibrary(){
    return(
        <div>
            <Navbar/>
            <SectionDiv>
                <h1>Script Library</h1>
                <button>
                    Upload script
                </button>
                <button>
                    Export script
                </button>
            </SectionDiv>
        </div>
    )
}