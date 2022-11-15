import TextField from "@mui/material/TextField";
import SectionDiv from "../components/SectionDiv";
import useCurrentUser from "../api/useCurrentUser";
import CopyToClipboardButton from "../components/CopytoClipboardButton";

export default function AccountInfo() {
  const user = useCurrentUser();
  const sshCommand = user
    ? `echo ${user.publicKey} > tmp.pub; ssh-copy-id -fi tmp.pub ${user.username}@uahpc.ua.edu; rm tmp.pub`
    : undefined;

  return (
    <div>
      {sshCommand && (
        <SectionDiv>
          <h1>Setting up your HPC Account</h1>
          <p>
            Before you can use the HPC Interface, you must first set up your account. To do so,
            simply:
          </p>
          <p>
            1. Copy and paste the following into your computer&apos;s Terminal (Mac) or Command
            Prompt (Windows) application:
          </p>
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
          <p>2. Press &apos;Enter&apos; key</p>
          <p>3. When prompted for a password, enter your myBama password</p>
        </SectionDiv>
      )}
    </div>
  );
}
