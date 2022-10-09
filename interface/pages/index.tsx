import type { NextPage } from "next";
import styled from "styled-components";
import SectionDiv from "../components/SectionDiv";

const LoginPage: NextPage = () => (
  <div>
    <Wrapper>
      <SectionDiv>
        Redirecting to myBama sign on...
      </SectionDiv>
    </Wrapper>
  </div>
);

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`

export default LoginPage;