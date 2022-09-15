import styled from 'styled-components';

const JobForm = () => (
  <div>
    <h1>Create Job</h1>
    <form>
      <InputsWrapper>
        <label>
          First name: 
          <Input type="text" name="name" />
        </label>
        <label>
          Last name: 
          <Input type="text" name="name" />
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

 
export default JobForm;