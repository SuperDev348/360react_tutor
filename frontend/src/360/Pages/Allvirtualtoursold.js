import React from "react";
import { ProductContext } from "../context/products";
import AllProductList from "../../360/Components/Products/AllProductList";

export default function AllVirtualTours() {
  const { products, counter } = React.useContext(ProductContext);
  return (
    <div>
      <AllProductList products={products} counter={counter} />
    </div>
  );
}
