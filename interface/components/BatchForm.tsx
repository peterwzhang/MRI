import React, { useState } from 'react';
import styled from 'styled-components';
import QuerySelect from './QuerySelect';


const BatchForm = () => {
    const [batch, setBatch] = useState({"name": "",
    "requiresApprovalStep": true,
    "script": {}});
    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {

    }
    const handleSubmit = () => {

    }
  return (
  <div>
    <h1>Create Batch</h1>
    <form onSubmit={handleSubmit}>
      <InputsWrapper>
        <label>Batch Name <Input type="text" name="batchName" onChange={handleChange}/></label>
        <label>Requires Approval? <Input type="checkbox" defaultChecked={true} name="defCheck" onChange={handleChange}></Input></label>
        <label>Script Name <QuerySelect restUrl='https://localhost:8443/api/scripts'></QuerySelect></label>
        <label>
          Param 1: 
          <Input type="text" name="param1" />
        </label>
        <label>
          Param 2: 
          <Input type="text" name="param2" />
        </label>
        <Submit type="submit" value="Submit" />
      </InputsWrapper>
    </form>
  </div>)
};

const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
`
const Input = styled.input`
  margin: .5rem;
`
const Submit = styled.input`
  margin-top: .5rem;
  max-width: 10rem;
`

export default BatchForm;