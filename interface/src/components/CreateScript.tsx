/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { apiUrl } from "../api/constants";
import QuerySelect from "./QuerySelect";

const ScriptMainInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: space-between;
`;
const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
  align-items: flex-start;
`;
const Input = styled.input`
  margin: 0.5rem;
  height: 2rem;
  width: 90%;
`;
const BigInput = styled(Input)`
  height: 4rem;
`;
const Submit = styled.input`
  margin-top: 0.5rem;
  max-width: 10rem;
`;

export default function CreateScript() {
  const [name, setName] = useState("");
  const [header, setHeader] = useState("");
  const [setupScript, setSetupScript] = useState("");
  const [setupScriptSlurmConfig, setSetupScriptSlurmConfig] = useState("");
  const [loopWrapperTop, setLoopWrapperTop] = useState("");
  const [idVariable, setIdVariable] = useState("");
  const [jobTemplate, setJobTemplate] = useState("");
  const [slurmTemplate, setSlurmTemplate] = useState("");
  const [loopWrapperBottom, setLoopWrapperBottom] = useState("");
  const [cleanupScript, setCleanupScript] = useState("");
  const [cleanupSlurmConfig, setCleanupSlurmConfig] = useState("");
  const [cleanupMode, setCleanupMode] = useState("");
  const [globalTemplate, setGlobalTemplate] = useState(false);

  const handleSubmit = () => {
    axios.post(`${apiUrl}/api/scripts`, {
      name,
      header,
      setupScript,
      setupScriptSlurmConfig,
      loopWrapperTop,
      idVariable,
      jobTemplate,
      slurmTemplate,
      loopWrapperBottom,
      cleanupScript,
      cleanupSlurmConfig,
      cleanupMode,
      globalTemplate,
    });
  };
  return (
    <div>
      <h1>Create Script</h1>
      <form onSubmit={handleSubmit}>
        <InputsWrapper>
          <ScriptMainInfo>
            <label>
              Script name
              <Input type="text" onChange={(e) => setName(e.target.value)} />
            </label>
            <div>
              <label>Global template?</label>
              <Input
                type="checkbox"
                defaultChecked={false}
                onClick={() => setGlobalTemplate(!globalTemplate)}
              />
            </div>
          </ScriptMainInfo>
          <label>Header</label>
          <BigInput type="text" onChange={(e) => setHeader(e.target.value)} />
          <label>Setup script</label>
          <BigInput type="text" onChange={(e) => setSetupScript(e.target.value)} />
          <label>Setup script slurm configuration</label>
          <BigInput type="text" onChange={(e) => setSetupScriptSlurmConfig(e.target.value)} />
          <label>ID variable</label>
          <Input type="text" onChange={(e) => setIdVariable(e.target.value)} />
          <label>Job template</label>
          <BigInput type="text" onChange={(e) => setJobTemplate(e.target.value)} />
          <label>Slurm template</label>
          <BigInput type="text" onChange={(e) => setSlurmTemplate(e.target.value)} />
          <label>Bottom of loop wrapper</label>
          <BigInput type="text" onChange={(e) => setLoopWrapperBottom(e.target.value)} />
          <label>Cleanup script</label>
          <BigInput type="text" onChange={(e) => setCleanupScript(e.target.value)} />
          <label>Cleanup mode</label>
          <Input type="text" onChange={(e) => setCleanupMode(e.target.value)} />
          <Submit type="submit" value="Submit" onClick={handleSubmit} />
        </InputsWrapper>
      </form>
    </div>
  );
}
