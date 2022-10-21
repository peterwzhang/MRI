import styled from "styled-components";

const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
`;
const Submit = styled.input`
  margin-top: 1rem;
  border-width: 0.05rem;
  border-radius: 0.5rem;
  padding: 1rem;
  width: 20%;
  font-size: 1rem;
`;

export default function JobSelect() {
  return (
    <div>
      <h1>View Job</h1>
      <form>
        <InputsWrapper>
          <label htmlFor="pickJob">Select job to view: </label>
          {/* <QuerySelect restUrl='https://localhost:8443/api/batches'></QuerySelect> */}
          {/* these parameters must be pulled from the BE */}
          <Submit name="pickJob" type="submit" value="Refresh Job Status" />
        </InputsWrapper>
      </form>
    </div>
  );
}
