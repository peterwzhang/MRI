import React from "react";
import SectionDiv from "../components/SectionDiv";
import UserInfo from "../components/UserInfo";
import styled from "styled-components";
import { useRouter } from "next/router";
import { url } from "../api/constants";
import axios from "axios";

export default function CreateBatch(){
    const router = useRouter()

    const handleLogout = () => {
        axios.post(`${url}/logout`)
        router.push('/')
    }

    return(
      <div>
        <SectionDiv>
          <h1>Account Information</h1>
          <UserInfo/>
          <LogOut onClick={() => handleLogout()}>Log Out</LogOut>
        </SectionDiv>
      </div>
    )
}

const LogOut = styled.button`
  margin-top: 1rem;
  hover: pointer;
  border-width: .05rem;
  border-radius: .5rem;
  padding: 1rem;
  width: 20%;
  font-size: 1rem;
`