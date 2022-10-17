import React from "react";
import SectionDiv from "../components/SectionDiv";
import styled from "styled-components";
import QueryList from "../components/QueryList"

export default function ScriptLibrary(){
    return(
        <SectionDiv>
            <h1>Script Library</h1>
            <QueryList restUrl='https://localhost:8443/api/scripts'></QueryList>
            <Buttons>
                <Button>
                    Upload script
                </Button>
                <Button>
                    Export script
                </Button>
            </Buttons>
        </SectionDiv>
    )
}

const Buttons = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 20rem;
`
const Button = styled.button`
    border-width: .05rem;
    border-radius: .5rem;
    padding: 1rem;
    width: 80%;
    font-size: 1rem;
`

