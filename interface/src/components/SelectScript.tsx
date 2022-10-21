import React, { useState } from "react";
import styled from "styled-components";
import { apiUrl } from "../api/constants";
import QuerySelect from "./QuerySelect";
import ViewScript from "./ViewScript";
import SectionDiv from "./SectionDiv";

const InputsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 1rem;
  gap: 0.5rem;
  font-size: 1.1rem;
  padding-top: 1rem;
`;
const Input = styled.input`
  margin: 0.5rem;
`;
const Submit = styled.input`
  margin-top: 0.5rem;
  max-width: 10rem;
`;

export default function SelectScript() {
  const [scriptId, setScriptId] = useState(0);
  return (
    <div>
      <InputsWrapper>
        <label htmlFor="batchType">Select script to view: </label>
        <QuerySelect
          restUrl={`${apiUrl}/api/scripts`}
          onChange={(e) => setScriptId(JSON.parse(e.target.value)?.id || 0)}
        />
      </InputsWrapper>
      {scriptId !== 0 && (
        <SectionDiv>
          <ViewScript scriptId={scriptId} />
        </SectionDiv>
      )}
    </div>
  );
}
