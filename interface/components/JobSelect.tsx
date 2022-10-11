import styled from 'styled-components';
import QuerySelect from './QuerySelect';

const JobSelect = () => (
  <div>
    <h1>View Job</h1>
    <form>
      <InputsWrapper>
        <label>Select job to view: </label>
        <QuerySelect restUrl='https://localhost:8443/api/batches'></QuerySelect>
        {/* these parameters must be pulled from the BE */}
        <Submit type="submit" value="Refresh Job Status" />
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

 
export default JobSelect;