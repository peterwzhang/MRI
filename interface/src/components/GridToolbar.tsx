import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { ReactNode } from "react";

export default function GridToolbar(props: {
  additionalButtons?: ReactNode;
  showExport?: boolean;
}) {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      {props.showExport === false ? undefined : <GridToolbarExport />}
      {props.additionalButtons}
    </GridToolbarContainer>
  );
}
