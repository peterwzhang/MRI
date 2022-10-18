import React from "react";
import Prism from "react-syntax-highlighter";
import ProgressBar from "../components/ProgressBar";

const JobInfo = () => (
  <div>
    <h3>Member Batch</h3>
    <p>Snow</p>
    <h3>Job Status</h3>
    <p>In Progress</p>
    <h3>Job Progress</h3>
    {/* <ProgressBar/> */}
    <h3>Current Runtime</h3>
    <p>100 hours</p>
    <h3>Job Log (last 50KB)</h3>
    <Prism>Example: analyzing image 29</Prism>
    <Prism>Example: running Job 1</Prism>
    <Prism>Example: Job 0 completed. Starting new job now</Prism>
  </div>
);

 
export default JobInfo;