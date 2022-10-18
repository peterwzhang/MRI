import type { NextPage } from "next";
import styled from "styled-components";
import SectionDiv from "../components/SectionDiv";

const Home: NextPage = () => (
  <div>
    <SectionDiv>
      <h1>Welcome to the HPC Interface!</h1>
      <Text>&emsp;Welcome to the interface for the image processing pipeline that runs on the University of Alabama's HPC. 
        With this website, you can select which projects, participants, and processes you want to submit to the cluster.
        After submitting this information, the software will use it to create the necessary input files and submit a new 
        job to the scheduler. Upon the completion of jobs, you can access the resulting files under the "View Jobs" tab.</Text>
    </SectionDiv>
  </div>
);

const Text = styled.p`
  font-size: 1.25em;
  line-height: 1.5;
`

export default Home;

