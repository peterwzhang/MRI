import styled from "styled-components";
import useLogout from "../api/useLogout";
import SectionDiv from "../components/SectionDiv";
import UserInfo from "../components/UserInfo";

const LogOut = styled.button`
  margin-top: 1rem;
  hover: pointer;
  border-width: 0.05rem;
  border-radius: 0.5rem;
  padding: 1rem;
  width: 20%;
  font-size: 1rem;
`;

export default function AccountInfo() {
  const logout = useLogout();

  return (
    <div>
      <SectionDiv>
        <h1>Account Information</h1>
        <UserInfo />
        <LogOut onClick={logout}>Log Out</LogOut>
      </SectionDiv>
    </div>
  );
}
