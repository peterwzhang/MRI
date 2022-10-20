import { useQuery } from '@tanstack/react-query';
import { Prism } from 'react-syntax-highlighter';
import { url } from '../api/constants';
import { Script } from '../types';

const ViewScript = ({scriptId}: {scriptId: number}) => {
    const { isLoading, error, data } = useQuery(['script'], () =>
        fetch(`${url}/api/scripts/${scriptId}`)
        .then(res => res.json())
    )
    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error</p>
    else return (
        <div>
            <h2>{data.name}</h2>
            <Prism>{data.header}</Prism>
            <Prism>{data.setupdata}</Prism>
            <Prism>{data.setupSlurmConfig}</Prism> 
            <Prism>{data.loopWrapperTop}</Prism>
            <Prism>{data.jobTemplate}</Prism>
            <Prism>{data.slurmTemplate}</Prism>
            <Prism>{data.loopWrapperBottom}</Prism>
            <Prism>{data.cleanupdata}</Prism>
            <Prism>{data.cleanupSlurmConfig}</Prism>
        </div>
    )
}

export default ViewScript;