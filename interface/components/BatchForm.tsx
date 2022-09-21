import styled from 'styled-components';

const BatchForm = () => (
  <div>
    <h1>Create Batch</h1>
    <form>
      <InputsWrapper>
        <label>Batch Name</label>
        <select name="batchType">
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