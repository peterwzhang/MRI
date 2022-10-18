import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { BatchMetadata } from '../types';
const QueryList = ({restUrl}: {restUrl: string}) => {
    const { isLoading, error, data } = useQuery(['data'], () =>
    fetch(restUrl).then(res =>
      res.json()
    )
  )

  if (isLoading) return <h1>Loading...</h1>

  if (error) return <h1>Error</h1>
  return (<ul>
    {data.map((d: BatchMetadata) => <li key={d.name} value={d.name}>{d.name}</li>)}
  </ul>)
}

export default QueryList;