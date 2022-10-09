import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { BatchMetadata, BatchMetadataWithId } from '../types';
const QuerySelect = ({restUrl}: {restUrl: string}) => {
    const { isLoading, error, data } = useQuery(['data'], () =>
    fetch(restUrl).then(res =>
      res.json()
    )
  )

  if (isLoading) return <h1>Loading...</h1>

  if (error) return <h1>Error</h1>
//   return data[0].name
  return (<select name="batchType">
    {data.map((d: BatchMetadata | BatchMetadataWithId) => <option key={d.name} value={d.name}>{d.name}</option>)}
</select>)
}

export default QuerySelect;