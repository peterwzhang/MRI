import { Button, ButtonProps, Container, Skeleton, styled, TextField } from "@mui/material";
import { green, red } from "@mui/material/colors";
import { useCallback, useMemo, useState } from "react";
import useCheckSsh from "../api/useCheckSsh";
import useCurrentUser from "../api/useCurrentUser";
import CopyToClipboardButton from "../components/CopytoClipboardButton";

enum TestResult {
  NOT_TESTED,
  LOADING,
  SUCCESS,
  FAILED,
}

const SuccessButton = styled(Button)<ButtonProps>(() => ({
  backgroundColor: green[500],
}));
const FailureButton = styled(Button)<ButtonProps>(() => ({
  backgroundColor: red[500],
}));

export default function AccountInfo() {
  const user = useCurrentUser();
  const sshCommand = user
    ? `echo ${user.publicKey} > tmp.pub; ssh-copy-id -fi tmp.pub ${user.username}@uahpc.ua.edu; rm tmp.pub`
    : undefined;

  const [testState, setTestState] = useState<TestResult>(TestResult.NOT_TESTED);

  const checkSsh = useCheckSsh();
  const doCheck = useCallback(async () => {
    setTestState(TestResult.LOADING);

    const result = await checkSsh();
    if (result.sshWorking) {
      setTestState(TestResult.SUCCESS);
    } else {
      setTestState(TestResult.FAILED);
    }
  }, [checkSsh]);

  const testButton = useMemo(() => {
    switch (testState) {
      case TestResult.NOT_TESTED:
        return (
          <Button onClick={doCheck} variant="contained">
            test it!
          </Button>
        );
      case TestResult.LOADING:
        return (
          <Button variant="contained" disabled>
            testing...
          </Button>
        );
      case TestResult.SUCCESS:
        return (
          <SuccessButton onClick={doCheck} variant="contained">
            success!
          </SuccessButton>
        );
      case TestResult.FAILED:
      default:
        return (
          <FailureButton onClick={doCheck} variant="contained">
            failed, please try again
          </FailureButton>
        );
    }
  }, [testState, doCheck]);

  return (
    <Container fixed>
      {sshCommand ? (
        <>
          <h1>Setting up your HPC Account</h1>
          <p>
            Before you can use the HPC Interface, you must first set up your account. To do so,
            simply follow these steps:
          </p>
          <ol>
            <li>
              Obtain access to the HPC cluster{" "}
              <a href="https://ua-app01.ua.edu/researchComputingPortal/public/member">from OIT</a>
            </li>
            <li>
              <p>
                Copy and paste the following into your computer&apos;s Terminal (Mac) or Command
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
            </li>
            <li>
              <p>Press the &apos;Enter&apos; key</p>
            </li>
            <li>
              <p>When prompted for a password, enter your myBama password</p>
            </li>
            <li>
              <p>Once that&apos;s done, click below to test that everything works:</p>
              {testButton}
            </li>
          </ol>
        </>
      ) : (
        <Skeleton />
      )}
    </Container>
  );
}
