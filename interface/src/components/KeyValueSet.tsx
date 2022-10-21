import { Grid } from "@mui/material";
import { CSSProperties, ReactNode } from "react";
import css from "./KeyValueSet.module.scss";

export default function KeyValueSet(props: {
  data: { key: string; value: ReactNode; hidden?: boolean }[];
  style?: CSSProperties;
  eachSize?: number;
}) {
  return (
    <Grid container className={css.keyValueWrapper} style={props.style}>
      {props.data
        .filter((p) => !p.hidden)
        .map((pair, i, arr) => (
          <Grid
            key={pair.key}
            item
            component="dl"
            xs={12}
            md={props.eachSize ?? 4}
            paddingRight={i === arr.length - 1 || props.eachSize === 12 ? 0 : 2}
          >
            <dt>{pair.key}</dt>
            <dd>{pair.value}</dd>
          </Grid>
        ))}
    </Grid>
  );
}
