import React from "react";
import styled from "styled-components";
import { setColor, media, setRem } from "../../styled";
import UserCard from "../Products/UserCard";

export default function UserProductList({ products, counter }) {
  return (
    <RoomsCenter>
      <>
        <div className="contain">
          {products.map((product, index) => {
            return (
              <UserCard
                key={product.id}
                {...product}
                pr={product}
                index={index}
                counter={counter}
              />
            );
          })}
        </div>
      </>
    </RoomsCenter>
  );
}
const RoomsCenter = styled.div`
  ${media.phone`
  .contain {
    display: grid;
    grid-template-columns: 1fr  ;
  }
  
  `}

  ${media.tablet`
  .contain {
    display: grid;
    grid-template-columns: 1fr  ;
  }

 
  `}
  
  ${media.desktop`
  .contain {
    display: grid;
    grid-template-columns: 1fr 1fr ;
   
  }
  

  `}

  ${media.large`

  .contain {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr  ;
    
  }


  
  `}
`;
