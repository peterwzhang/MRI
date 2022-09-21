import styled from 'styled-components';

const BatchForm = () => (
  <div>
    <h1>Create Job</h1>
    <form>
      <InputsWrapper>
        <label>Job Name</label>
        <select name="jobType">
            {/* These need to be pulled from the BE */}
            <option value="abide_organizer.sh">Abide Organizer</option>
            <option value="parallel_flanker.sh">Parallel Flanker</option>
            <option value="recon_parallel_abide.sh">Recon Parallel Abide</option>
            <option value="recon_single_sub.sh">Recon Single Sub</option>
            <option value="slurm-interaction.sh">Slurm Interaction</option>            <option value="jobType">Recon Parallel Abide</option>
            <option value="slurm-test.sh">Slurm Test</option>


        </select>
        {/* these parameters must be pulled from the BE */}
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

 
export default BatchForm;