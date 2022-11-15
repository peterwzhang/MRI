import { Button, Snackbar } from "@mui/material";
import { useState } from "react";

export default function CopyToClipboardButton(props: {textToCopy: string}) {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
    navigator.clipboard.writeText(props.textToCopy);
  };
  return (
    <>
      <Button onClick={handleClick}>Copy to Clipboard</Button>
      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={2000}
        message="Copied to clipboard"
      />
    </>
  );
}
