import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import { url } from '../api/constants';
import { BatchMetadata, Script } from '../types';
import QuerySelect from './QuerySelect';
import ScriptParams from './ScriptParams';


const BatchForm = () => {
    const [name, setName] = useState('');
    const [checked, setChecked] = useState(true);
    const [script, setScript] = useState<Script | undefined>(undefined);

    const handleSelect = (e:any) => { //TODO: fix any type
      setScript(JSON.parse(e.target.value))
    }
    
  return (
  <div>
    <h1>Create Batch</h1>
      <InputsWrapper>
        <label>Batch Name <Input type="text" id="batchName" onChange={e => setName(e.target.value)}/></label>
        <label>Requires Approval? <Input type="checkbox" defaultChecked={true} id="defCheck" onClick={() => setChecked(!checked)}></Input></label>
        <label>Script  <QuerySelect restUrl={`${url}/api/scripts`} onChange={handleSelect}></QuerySelect></label>
        {script?.id && (
          <ScriptParams name={name} needsApproval={checked} scriptId={script.id}/>
        )}
      </InputsWrapper>
  </div>)
};

const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
  gap: 1rem;
  font-size: 1rem;
`
const Input = styled.input`
  margin-left: .25rem;
`

export default BatchForm;