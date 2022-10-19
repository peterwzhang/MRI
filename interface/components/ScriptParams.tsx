import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { Prism } from 'react-syntax-highlighter';
import styled from 'styled-components';
import { url } from '../api/constants';
import { ScriptForCreation, BatchForSubmission } from '../types';

type Props = {
    name: string, 
    needsApproval: boolean, 
    scriptId : string, 
  }
const ScriptParams = (props: Props) => { 
    const fetchScript = (): Promise<ScriptForCreation> => axios.get(`${url}/api/scripts/${props.scriptId}`).then(response => response.data)
    const { data : script, isLoading } = useQuery(['batches'], fetchScript)
    const [ params, setParams ] = useState('')
    const [ submitted, setSubmitted ] = useState(false)

    const handleSubmit = async () => {
        await axios.post<BatchForSubmission>(`${url}/api/batches`, 
          {
              name: props.name,
              requiresApprovalStep: props.needsApproval,
              script: {
                ...script,
                header: params
              }
          })
        setSubmitted(true) //TODO: Fix this to be able to submit multiple
    }

    if (isLoading){
        return <p>Loading script parameters...</p>
    }
    else {
        return (
            <div>
                {script && (
                    <Wrapper>
                        <label>
                            Parameters 
                        </label>
                        <Input name="param" onChange={(e) => setParams(e.target.value)} defaultValue={script.header}/>
                        <Submit onClick={handleSubmit}>Submit batch</Submit>
                        {submitted && (
                            <Prism>Submitted</Prism>
                        )}
                    </Wrapper>
                )}
            </div>
    )}
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const Input = styled.textarea`
  margin-left: .25rem;
  width: 80%;
  height: 8rem;
`
const Submit = styled.button`
  margin-top: .5rem;
  max-width: 10rem;
  border-width: .05rem;
  border-radius: .5rem;
  padding: 1rem;
  width: 80%;
  font-size: 1rem;
`


export default ScriptParams;