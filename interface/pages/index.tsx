import type { NextPage } from "next";
import Head from "next/head";
import HeroBanner from "../components/HeroBanner"
import Navbar from './Navbar'
import SectionDiv from "../components/SectionDiv";

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
  </div>
);


export default Home;

