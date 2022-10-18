import React from "react";
import Prism from "react-syntax-highlighter";
import ProgressBar from "../components/ProgressBar";
import { BatchMetadata } from "../types";
import JobsTable from "./JobsTable";

const BatchInfo = ({batch}: {batch:BatchMetadata}) => (
  <div>
    <h1>{batch.name}</h1>
    <ProgressBar progress={batch.statusSummary.success ? (batch.statusSummary.success / batch.jobs.length)*100 : 0}/>
    {batch.jobs && (
      <div>
        <h3>Status</h3>
        <Prism>{batch.status}</Prism>
        <h3>Job Summary</h3>
        <ul>
          {batch.statusSummary.success && (
            <li>Success: {batch.statusSummary.success}</li>
          )}
          <li>Running: {batch.statusSummary.running}</li>
          <li>Waiting: {batch.statusSummary.waiting}</li>
          <li>Failed: {batch.statusSummary.failed}</li>
        </ul>

        <div>
          <h3>Jobs</h3>
          <JobsTable jobs={batch.jobs}/>
        </div>
      </div>
    )}
    <h3>Start Time</h3>
    <Prism>{batch.startedAt}</Prism>
    <h3>Script Used</h3>
    <Prism>{batch.scriptUsed.name}</Prism>
  </div>
);

 
export default BatchInfo;