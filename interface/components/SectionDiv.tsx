import styled from 'styled-components';
import { theme } from '../constants';

const SectionDiv = styled.div`
    padding: 3rem;
    background: whitesmoke;
    box-shadow: ${() => theme.BOXSHADOW} 0 .5rem 1.5rem;
    max-width: 80%;
    min-width: 40%;
    border-radius: 2rem;
    margin: 4rem;
`
export default SectionDiv;