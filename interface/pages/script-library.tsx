import React, { useState } from "react";
import SectionDiv from "../components/SectionDiv";
import styled from "styled-components";
import SelectScript from "../components/SelectScript";
import CreateScript from "../components/CreateScript";

export default function ScriptLibrary(){
    enum Option {
        View = 1,
        Create,
    }
    const [selected, setSelected] = useState(Option.View)

    const handleChange = (e: any) => { //TODO: Fix any type
        setSelected(e.currentTarget.value)
    }


    return(
        <SectionDiv>
            <h1>Script Library</h1>
            <Buttons>
                <label>
                    <input type="radio" value={Option.View} checked={selected == Option.View} onChange={handleChange}/>
                    View script
                </label>
                <label>
                    <input type="radio" value={Option.Create} checked={selected == Option.Create} onChange={handleChange}/>
                    Create script
                </label>
            </Buttons>
            {selected == Option.View && (
                <SelectScript/> 
            )}
            {selected == Option.Create && (
                <SectionDiv>
                    <CreateScript/>   
                </SectionDiv>
            )}
        </SectionDiv>
    )
}

const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: 1rem;
    gap: 1rem;
    font-size: 1.25rem;
`

