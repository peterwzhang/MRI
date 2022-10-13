import styled from 'styled-components';
import QuerySelect from './QuerySelect';

const BatchForm = () => (
  <div>
    <h1>Create Batch</h1>
    <form>
      <InputsWrapper>
        <label>Script Name</label>
        <QuerySelect restUrl='https://localhost:8443/api/scripts'></QuerySelect>
        {/* these parameters must be pulled from the BE */}
        <label>
          Param 1: 
          <Input type="text" name="param1" />
        </label>
        <label>
          Param 2: 
          <Input type="text" name="param2" />
        </label>
        <Submit type="submit" value="Submit" />
      </InputsWrapper>
    </form>
  </div>
);

const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
`
const Input = styled.input`
  margin: .5rem;
`
const Submit = styled.input`
  margin-top: .5rem;
  max-width: 10rem;
`

 
export default BatchForm;