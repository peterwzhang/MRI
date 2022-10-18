import React from "react";
import SectionDiv from "../components/SectionDiv";
import styled from "styled-components";
import QueryList from "../components/QueryList"
import QuerySelect from "../components/QuerySelect";
import FileSelect from "../components/FileSelect";

export default function ScriptLibrary(){
    return(
        <div>
            <SectionDiv>
                <h1>Script Library</h1>
                <h3>List of Scripts</h3>
                <QueryList restUrl='https://localhost:8443/api/scripts'></QueryList>
            </SectionDiv>
            <SectionDiv>
                <h3>Upload a Script</h3>
                <FileSelect/>
                <Button>Upload script</Button>
            </SectionDiv>
            <SectionDiv>
                <h3>Export a Script</h3>
                <label>Select a script to export: </label>
                <QuerySelect restUrl='https://localhost:8443/api/scripts'></QuerySelect>
                <p></p>
                <Button>Export script</Button>
            </SectionDiv>
        </div>
    )
}

const Button = styled.button`
    flext-wrap: wrap;
    border-width: .05rem;
    border-radius: .5rem;
    padding: 1rem;
    cursor: pointer;
    width: 16rem;
    font-size: 1rem;
`

