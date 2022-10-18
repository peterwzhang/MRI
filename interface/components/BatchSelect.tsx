import styled from 'styled-components';
import { url } from '../api/constants';
import QuerySelect from './QuerySelect';

type params = {
  setBatch: (e: any) => void //TODO: change from 'any'
}
export default function BatchSelect(props: params){
  

  return (
  <div>
    <h1>View Batch</h1>
    <form>
      <InputsWrapper>
        <label>Select batch to view: </label>
        <QuerySelect restUrl={`${url}/api/batches`} onChange={(e) => props.setBatch(JSON.parse(e.target.value))}></QuerySelect>
      </InputsWrapper>
    </form>
  </div>
  )
};

const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-left: 1rem;
`