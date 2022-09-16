import type { NextPage } from "next";
import Link from "next/link"
import Head from "next/head";
import JobForm from "../components/JobForm";
import HeroBanner from "../components/HeroBanner"
import JobTable from '../components/JobTable';
import SectionDiv from "../components/SectionDiv";
import Navbar from './Navbar'

const Home: NextPage = () => (
  <div>
    <Head>
      <title>MRI Project</title>
      <meta name="description" content="CS 495 Capstone project" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <HeroBanner />
    <Navbar />
    <SectionDiv>
      <h1>Welcome to MRIREDCapHPCHCPGUI!</h1>
      <p>We have yet to come up with a real name for this!</p>
    </SectionDiv>
    <SectionDiv>
      <JobForm />
    </SectionDiv>
    <SectionDiv>
      <JobTable />
    </SectionDiv>
  </div>
);


export default Home;

