import type { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";
import HeroBanner from "../components/HeroBanner";
import Login from "../components/Login";
import SectionDiv from "../components/SectionDiv";

const LoginPage: NextPage = () => (
  <div>
    <Head>
      <title>MRI Project</title>
      <meta name="description" content="CS 495 Capstone project" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <HeroBanner/>
    <Wrapper>
      <SectionDiv>
        <Login/>
      </SectionDiv>
    </Wrapper>
  </div>
);

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`

export default LoginPage;