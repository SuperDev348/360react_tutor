import React from "react";
import styled from "styled-components";
import { setColor, media, setRem } from "../../styled";
import MainProductCardForNonLogin from "../Products/MainProductCardForNonLogin";
import MainProductCard from "../Products/MainProductCard";
import { UserContext } from "../../context/user";
export default function AllProductList({ products, counter }) {
  const { user } = React.useContext(UserContext);
  let [productUser, setproductUser] = React.useState([]);
  console.log(products);
  console.log(user);

  return (
    <RoomsCenter>
      <>
        <div className="contain">
          {products.map((product, index) => {
            return (
              <MainProductCardForNonLogin
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
  ${media.phone`
  .contain {
    display: grid;
    grid-template-columns: auto  ;
    /* margin:3rem; */
  }
  
  `}

  ${media.tablet`
  .contain {
    display: grid;
    grid-template-columns: auto  ;
    /* margin:3rem; */
  }

 
  `}
  
  ${media.desktop`
  .contain {
    display: grid;
    grid-template-columns: auto auto   ;
    /* margin:3rem 3rem; */
   
  }
  

  `}

  ${media.large`

  .contain {
    display: grid;
    grid-template-columns: auto auto auto   ;
    /* margin:0rem 3rem; */
    
  }


  
  `}
`;
