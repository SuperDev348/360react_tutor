import React from "react";
import styled from "styled-components";
import { setColor, media, setRem } from "../styled";

import AllUserCard from "../Components/AllUserCard";
export default function UserProductList({ users }) {
  console.log(users);
  return (
    <RoomsCenter>
      <>
        <div className="contain">
          {users.map((product, index) => {
            return (
              <AllUserCard
                key={product.id}
                {...product}
                pr={product}
                index={index}
              />
            );
          })}
        </div>
      </>
    </RoomsCenter>
  );
}
const RoomsCenter = styled.div`
  .contain {
    gap: 20px;
  }
  ${media.phone`
  .contain {
    display: grid;
    grid-template-columns: auto  ;
  }
  
  `}

  ${media.tablet`
  .contain {
    display: grid;
    grid-template-columns: 1fr 1fr ;
  }

 
  `}
  
  ${media.desktop`
  .contain {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr ;
  }
  

  `}

  ${media.large`

  .contain {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr ;
  }


  
  `}
`;
