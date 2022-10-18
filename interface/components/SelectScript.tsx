import React, { useState } from 'react';
import styled from 'styled-components';
import { url } from '../api/constants';
import QuerySelect from './QuerySelect';
import ViewScript from './ViewScript';
import SectionDiv from './SectionDiv';

//TODO: Check script type is up to date

const SelectScript = () => {
    const [scriptId, setScriptId] = useState(0);
  return (
    <div>
        <InputsWrapper>
            <label>Select script to view: </label>
            <QuerySelect restUrl={`${url}/api/scripts`} onChange={(e) => setScriptId(JSON.parse(e.target.value)?.id || 0)}></QuerySelect>
        </InputsWrapper>
        {scriptId != 0 && (
            <SectionDiv>
                <ViewScript scriptId={scriptId}/>
            </SectionDiv>
        )}
    </div>
  )
};

const InputsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 1rem;
  gap: .5rem;
  font-size: 1.1rem;
  padding-top: 1rem;
`
const Input = styled.input`
  margin: .5rem;
`
const Submit = styled.input`
  margin-top: .5rem;
  max-width: 10rem;
`

export default SelectScript;