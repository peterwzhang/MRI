import Alert from "@mui/material/Alert";
import React from "react";
import { Link } from "react-router-dom";
import useCurrentUser from "../api/useCurrentUser";
import "../styles/globals.css";

export default function SshBanner() {
  const user = useCurrentUser();
  const errorMsg = user?.sshWorking
    ? undefined
    : "Before creating a batch, you must ";
  // if (!user || !errorMsg) return null;

  return (
    <Alert severity="error">{errorMsg}
      <Link to="/account">set up your account</Link>
    </Alert>
  );
}
