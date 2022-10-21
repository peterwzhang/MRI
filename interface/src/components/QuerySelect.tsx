import { useQuery } from "@tanstack/react-query";
import { ChangeEventHandler } from "react";
import { BatchMetadataWithId } from "../types";

type params = {
  restUrl: string,
  onChange: ChangeEventHandler<HTMLSelectElement> | undefined
}
function QuerySelect(props: params) {
  const { isLoading, error, data } = useQuery(["data"], () =>
    fetch(props.restUrl).then((res) =>
      res.json()
    )
  );
  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>Error</h1>;
  return (
    <select name="batchType" onChange={props.onChange}>
      <option disabled selected> click to select... </option>
      {data.map((d: BatchMetadataWithId) => <option key={d.id} value={JSON.stringify(d)}>{d.name}</option>)}
    </select>
  );
}

export default QuerySelect;
