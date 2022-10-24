import { Add as AddIcon } from "@mui/icons-material";
import { Container, Fab, Skeleton } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import useScript from "../../api/useScript";
import ScriptDisplay from "../../components/ScriptDisplay";

export default function ScriptView() {
  const id = useParams().scriptId;

  const script = useScript(id);

  return (
    <Container fixed>
      {script === undefined ? <Skeleton /> : <ScriptDisplay primary script={script} />}
      <Link to="/script/new">
        <Fab color="primary" style={{ position: "fixed", right: 16, bottom: 16 }}>
          <AddIcon />
        </Fab>
      </Link>
    </Container>
  );
}
