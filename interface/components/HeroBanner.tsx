import styled from 'styled-components';

const HeroBanner = () => (
  <Banner>
    <a href="https://www.ua.edu/" >
      <img src="/UA_nameplate.png" height="24"/>
    </a>
  </Banner>
);

const Banner = styled.div`
  display: flex;
  align-items: center;
  background: #9e1b32;
  min-height: 3rem;
  width: 100%;
  padding: .5rem 2rem;
`

export default HeroBanner;