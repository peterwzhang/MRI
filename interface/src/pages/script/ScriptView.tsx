import { Edit as EditIcon } from "@mui/icons-material";
import { Container, Fab, Skeleton } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import useCurrentUser from "../../api/useCurrentUser";
import useScript from "../../api/useScript";
import ScriptDisplay from "../../components/ScriptDisplay";
import canEditScript from "../../utils/canEditScript";

export default function ScriptView() {
  const id = useParams().scriptId;

  const script = useScript(id);
  const user = useCurrentUser();

  return (
    <Container fixed>
      {script === undefined ? (
        <Skeleton />
      ) : (
        <>
          <ScriptDisplay primary script={script} />
          {canEditScript(script, user) ? (
            <Link to={`/script/${id}/edit`}>
              <Fab color="primary" style={{ position: "fixed", right: 16, bottom: 16 }}>
                <EditIcon />
              </Fab>
            </Link>
          ) : undefined}
        </>
      )}
    </Container>
  );
}
