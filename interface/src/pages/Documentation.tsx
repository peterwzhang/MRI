import Button from "@mui/material/Button";
import { createRef } from "react";
import SectionDiv from "../components/SectionDiv";

export default function Documentation() {
  const SetupRef = createRef<HTMLDivElement>();
  const DashboardRef = createRef<HTMLDivElement>();
  const BatchRef = createRef<HTMLDivElement>();
  const ScriptRef = createRef<HTMLDivElement>();
  const CodebaseRef = createRef<HTMLDivElement>();

  const handleClick = (ref: React.RefObject<HTMLDivElement>) => {
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
          <a href="https://youtu.be/OIMvPzN9dlU" target="_blank" rel="noreferrer">
            Video Tutorial
          </a>
        </p>
        <p>
          <a href="https://hpc-interface-dev.ua.edu/account" target="_blank" rel="noreferrer">
            Set Up HPC Account
          </a>
        </p>
        <p>
          <a href="https://research-computing-portal.oitapps.ua.edu/member" target="_blank" rel="noreferrer">
            University of Alabama Research Computing Portal
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
          <a
            href="https://github.com/peterwzhang/MRI/tree/main/interface"
            target="_blank"
            rel="noreferrer"
          >
            User Interface GitHub
          </a>
        </p>
        <p>
          <a
            href="https://github.com/peterwzhang/MRI/tree/main/backend"
            target="_blank"
            rel="noreferrer"
          >
            Backend GitHub
          </a>
        </p>
      </SectionDiv>
    </div>
  );
}
