import styled from "styled-components";
import TextField from "@mui/material/TextField";
import SectionDiv from "../components/SectionDiv";
import UserInfo from "../components/UserInfo";
import useCurrentUser from "../api/useCurrentUser";
import CopyToClipboardButton from "../components/CopytoClipboardButton";
import useLogout from "../api/useLogout";


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
  const user = useCurrentUser();
  const sshCommand = user
    ? `echo ${user.publicKey} > tmp.pub; ssh-copy-id -fi tmp.pub ${user.username}@uahpc.ua.edu; rm tmp.pub`
    : undefined;
  const logout = useLogout();

  return (
    <div>
      <SectionDiv>
        <h1>Account Information</h1>
        <UserInfo />
        <LogOut onClick={logout}>Log Out</LogOut>
      </SectionDiv>
      {sshCommand && (
        <SectionDiv>
          <h1>Setting up your HPC Account</h1>
          <p>Before you can use the HPC Interface, you must set up your HPC account. To do so, simply copy and paste the following into your computer&apos;s Terminal application:</p>
          <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
            <TextField
              id="standard-read-only-input"
              defaultValue={sshCommand}
              sx={{ minWidth: "50%" }}
              InputProps={{
                readOnly: true,
              }}
            />
            <p>or</p>
            <CopyToClipboardButton textToCopy={sshCommand} />
          </div>
        </SectionDiv>
      )}
    </div>
  );
}
