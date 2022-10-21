import React from "react";
import SectionDiv from "../components/SectionDiv";
import JobSelect from "../components/JobSelect";
import JobInfo from "../components/JobInfo";

export default function ViewJob() {
  return (
    <div>
      <SectionDiv>
        <JobSelect />
      </SectionDiv>
      <SectionDiv>
        <JobInfo />
      </SectionDiv>
    </div>
  );
}