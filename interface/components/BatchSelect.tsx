import styled from 'styled-components';
import QuerySelect from './QuerySelect';

const BatchSelect = () => (
  <div>
    <h1>View Batch</h1>
    <form>
      <InputsWrapper>
        <label>Select batch to view: </label>
        <QuerySelect restUrl='https://localhost:8443/api/scripts'></QuerySelect>
        {/* these parameters must be pulled from the BE */}
        <Submit type="submit" value="Refresh Batch Status" />
      </InputsWrapper>
    </form>
  </div>
);

const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
`
const Submit = styled.input`
  margin-top: 1rem;
  border-width: .05rem;
  border-radius: .5rem;
  padding: 1rem;
  width: 20%;
  font-size: 1rem;
`

 
export default BatchSelect;