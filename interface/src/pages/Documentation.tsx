import Button from "@mui/material/Button";
import { useRef } from "react";
import SectionDiv from "../components/SectionDiv";

export default function Documentation() {
  const SetupRef = useRef(null);
  const DashboardRef = useRef(null);
  const BatchRef = useRef(null);
  const ScriptRef = useRef(null);
  const CodebaseRef = useRef(null);

  const handleClick = (ref: any) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div>
      <SectionDiv>
        <h1>Table of Contents</h1>
        <ul>
          <li>
            <Button variant="text" onClick={() => handleClick(SetupRef)}>Setting up your HPC account</Button>
          </li>
          <li>
            <Button variant="text" onClick={() => handleClick(DashboardRef)}>Using the dashboard</Button>
          </li>
          <li>
            <Button variant="text" onClick={() => handleClick(BatchRef)}>Creating a batch</Button>
          </li>
          <li>
            <Button variant="text" onClick={() => handleClick(ScriptRef)}>Using the script library</Button>
          </li>
          <li>
            <Button variant="text" onClick={() => handleClick(CodebaseRef)}>Code base documentation</Button>
          </li>
        </ul>
      </SectionDiv>
      <SectionDiv ref={SetupRef}>
        <h1>Setting up your HPC account</h1>
        <p>
          <a href="https://github.com/peterwzhang/MRI" target="_blank" rel="noreferrer">
            Example Link (github)
          </a>
        </p>
      </SectionDiv>
      <SectionDiv ref={DashboardRef}>
        <h1>Using the Dashboard</h1>
        <p>
          <a href="https://github.com/peterwzhang/MRI" target="_blank" rel="noreferrer">
            Example Link (github)
          </a>
        </p>
      </SectionDiv>
      <SectionDiv ref={BatchRef}>
        <h1>Creating a Batch</h1>
        <p>
          <a href="https://github.com/peterwzhang/MRI" target="_blank" rel="noreferrer">
            Example Link (github)
          </a>
        </p>
      </SectionDiv>
      <SectionDiv ref={ScriptRef}>
        <h1>Using the Script Library</h1>
        <p>
          <a href="https://github.com/peterwzhang/MRI" target="_blank" rel="noreferrer">
            Example Link (github)
          </a>
        </p>
      </SectionDiv>
      <SectionDiv ref={CodebaseRef}>
        <h1>Code Base Documentation</h1>
        <p>
          <a href="https://peterwzhang.github.io/MRI/" target="_blank" rel="noreferrer">
            Project Website
          </a>
        </p>
        <p>
          <a href="https://github.com/peterwzhang/MRI" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </p>
        <p>
          <a href="https://github.com/peterwzhang/MRI/tree/main/interface" target="_blank" rel="noreferrer">
            User Interface GitHub
          </a>
        </p>
        <p>
          <a href="https://github.com/peterwzhang/MRI/tree/main/backend" target="_blank" rel="noreferrer">
            Backend GitHub
          </a>
        </p>
      </SectionDiv>
    </div>
  );
}
