import React, { Component } from 'react';
import styled from 'styled-components';
import Main from '../Main';

const StyledDiv = styled.div`
width: 960px;
position: relative;
margin:0 auto;
line-height: 1.4em;

@media only screen and (max-width: 479px){
  #container2 { width: 20%; }
}
`;

function Purchase() {
    return (
      <div>
         <StyledDiv className="container-fluid mt-5">
            <h1 style={{ color: '#000' }}>Purchase Product</h1>
          </StyledDiv>
            {/* <StyledDiv className="container-fluid mt-5">
            <div className="row">
              <main role="main" className="col-lg-12 d-flex mt-2">
               <Main 
                    products={this.state.products} 
                    createProduct={this.createProduct}
                    purchaseProduct={this.purchaseProduct} />
              </main>
            </div>
        </StyledDiv> */}
      </div>
    
    );
}

export default Purchase;