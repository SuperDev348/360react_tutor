import React from "react";
import styled from "styled-components";
import { setColor, media, setRem } from "../../styled";
import MainProductCard from "../Products/MainProductCard";
import { UserContext } from "../../context/user";
export default function AllProductList({ products, counter, likes }) {
  const { user } = React.useContext(UserContext);
  let [productUser, setproductUser] = React.useState([]);
  console.log(products);
  console.log(user);
  const PublishTours = products.filter((item) => item.publish === true);
  console.log(PublishTours);

  return (
    <RoomsCenter>
      <>
        <div className="contain">
          {PublishTours.map((product, index) => {
            return (
              <MainProductCard
                key={product.id}
                {...product}
                pr={product}
                index={index}
                counter={counter}
                likes={likes}
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
    margin:3rem;
  }
  
  `}

  ${media.tablet`
  .contain {
    display: grid;
    grid-template-columns: 1fr  ;
    margin:3rem;
  }

 
  `}
  
  ${media.desktop`
  .contain {
    display: grid;
    grid-template-columns: 1fr 1fr ;
    margin:3rem 3rem;
   
  }
  

  `}

  ${media.large`

  .contain {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr ;
    margin:3rem 3rem;
    
  }


  
  `}
`;
