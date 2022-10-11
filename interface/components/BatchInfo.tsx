import React from "react";
import Prism from "react-syntax-highlighter";
import ProgressBar from "../components/ProgressBar";

const BatchInfo = () => (
  <div>
    <h3>Jobs List</h3>
    <ul>
      <li>Job 1</li>
      <li>Test Job</li>
      <li>Imaginary Job</li>
    </ul>
    <h3>Batch Status</h3>
    <p>2/3 Jobs Completed</p>
    <ProgressBar/>
    <h3>Current Runtime</h3>
    <p>200 hours</p>
    <h3>Currently Running Job: Imaginary Job</h3>
    <h4>Imaginary Job Log</h4>
    <Prism>Example: analyzing image 29</Prism>
    <Prism>Example: running Job 1</Prism>
    <Prism>Example: Job 0 completed. Starting new job now</Prism>
  </div>
);

 
export default BatchInfo;