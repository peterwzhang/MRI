import { Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <Container fixed>
      <Typography variant="h3">Page not found</Typography>

      <Typography variant="body1">
        This page could not be found. Go <Link to="/">home</Link>?
      </Typography>
    </Container>
  );
}
