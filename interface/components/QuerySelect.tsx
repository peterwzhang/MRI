import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { ChangeEventHandler } from 'react';
import { BatchMetadata } from '../types';

type params = {
  restUrl: string, 
  onChange: ChangeEventHandler<HTMLSelectElement> | undefined
}
const QuerySelect = (props: params) => {
    const { isLoading, error, data } = useQuery(['data'], () =>
      fetch(props.restUrl).then(res =>
        res.json()
      )
  )
  if (isLoading) return <h1>Loading...</h1>
  if (error) return <h1>Error</h1>
//   return data[0].name
  return (
    <select name="batchType" onChange={props.onChange}>
      <option disabled selected> click to select... </option>
      {data.map((d: BatchMetadata) => <option key={d.name} value={JSON.stringify(d)}>{d.name}</option>)}
    </select>
)
}

export default QuerySelect;