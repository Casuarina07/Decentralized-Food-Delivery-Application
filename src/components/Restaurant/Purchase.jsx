import React, { Component } from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
width: 960px;
position: relative;
margin:0 auto;
line-height: 1.4em;

@media only screen and (max-width: 479px){
  #container2 { width: 20%; }
}
`;

class Purchase extends Component {

  render() {
    return (
      <StyledDiv className="container-fluid mt-5">
        <h1 style={{ color: '#000' }}>Purchase Product</h1>
      </StyledDiv>
    );
  }
}

export default Purchase;