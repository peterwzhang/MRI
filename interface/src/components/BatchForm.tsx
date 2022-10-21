import React, { useState } from "react";
import styled from "styled-components";
import { apiUrl } from "../api/constants";
import { Script } from "../types";
import QuerySelect from "./QuerySelect";
import ScriptParams from "./ScriptParams";

const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
  gap: 1rem;
  font-size: 1rem;
`;
const Input = styled.input`
  margin-left: 0.25rem;
`;

function BatchForm() {
  const [name, setName] = useState("");
  const [checked, setChecked] = useState(true);
  const [script, setScript] = useState<Script | undefined>(undefined);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setScript(JSON.parse(e.target.value));
  };

  return (
    <div>
      <h1>Create Batch</h1>
      <InputsWrapper>
        <label htmlFor="batchName">
          Batch Name{" "}
          <Input type="text" name="batchName" onChange={(e) => setName(e.target.value)} />
        </label>
        <label htmlFor="defCheck">
          Requires Approval?{" "}
          <Input
            type="checkbox"
            defaultChecked
            name="defCheck"
            onClick={() => setChecked(!checked)}
          />
        </label>
        <label htmlFor="batchType">
          Script <QuerySelect restUrl={`${apiUrl}/api/scripts`} onChange={handleSelect} />
        </label>
        {script?.id && <ScriptParams name={name} needsApproval={checked} scriptId={script.id} />}
      </InputsWrapper>
    </div>
  );
}

export default BatchForm;
