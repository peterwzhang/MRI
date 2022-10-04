import type { NextPage } from "next";
import styled from "styled-components";
import Login from "../components/Login";
import SectionDiv from "../components/SectionDiv";

const LoginPage: NextPage = () => (
  <div>
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