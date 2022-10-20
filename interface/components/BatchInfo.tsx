import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Prism from "react-syntax-highlighter";
import { url } from "../api/constants";
import ProgressBar from "../components/ProgressBar";
import { BatchMetadata, BatchMetadataWithId } from "../types";
import JobsTable from "./JobsTable";

const BatchInfo = ({batch}: {batch:BatchMetadataWithId}) => {

  const fetchBatch = (): Promise<BatchMetadataWithId> => axios.get(`${url}/api/batches/${batch.id}`).then(response => response.data)
  const { data } = useQuery(['batch'], fetchBatch)

  return (
    <div>
    {data && (
      <div>
        <h1>{data.name}</h1>
        <ProgressBar progress={data.statusSummary.success ? (data.statusSummary.success / data.jobs.length)*100 : 0}/>
        {data.jobs && (
          <div>
            <h3>Status</h3>
            <Prism>{data.status}</Prism>
            <h3>Job Summary</h3>
            <ul>
              {data.statusSummary.success && (
                <li>Success: {data.statusSummary.success}</li>
              )}
              <li>Running: {data.statusSummary.running}</li>
              <li>Waiting: {data.statusSummary.waiting}</li>
              <li>Failed: {data.statusSummary.failed}</li>
            </ul>

            <div>
              <h3>Jobs</h3>
              <JobsTable jobs={data.jobs}/>
            </div>
          </div>
        )}
        <h3>Start Time</h3>
        <Prism>{data.startedAt}</Prism>
        <h3>Script Used</h3>
        <Prism>{data.scriptUsed.name}</Prism>
      </div>
    )}
    </div>
)};

 
export default BatchInfo;