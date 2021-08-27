import React, { useState, useEffect } from "react";
import { ProductContext } from "../context/products";
import Pagination from "../../components/@vuexy/Pagination/Pagination";
import AllProductList from "../../360/Components/Products/AllProductList";
import axios from "axios";
import Loading from "../Pages/Loading";
export default function AllVirtualTours() {
  const [productso, setProductso] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [productTotal, setProductTotal] = useState();
  const [loading, setLoading] = useState(false);
  React.useEffect(() => {
    showPlaces();
  }, []);
  const showPlaces = () => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/places`, {
        params: { currentPage, pageSize },
      })
      .then((res) => {
        console.log(res.data);
        setProductTotal(res.data.length);
        console.log(res.data.length);
        setProductso(res.data);
        setLoading(false);
      });
  };
  let handlePageChange = (currentPage) => {
    console.log(currentPage);
    setCurrentPage(currentPage);
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/places`, {
        params: { currentPage, pageSize },
      })
      .then((res) => {
        console.log(res.data);
        setProductso(res.data);
        setLoading(false);
      });
  };

  const { products, counter, likes } = React.useContext(ProductContext);
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="mt-5">
      {/* <div>
        <h2 style={{ textAlign: "center", marginTop: "4rem" }}>Best New</h2>
        <p
          style={{
            textAlign: "center",
            marginTop: "1rem",
            padding: "2rem 9rem",
          }}
        >
          Explore our best-in-class 360 multiresolution panoramas and most
          catchy virtual reality tours created by Roundme VR photographers
          daily. Use “Search” button or categories icon to quickly find or
          filter panoramic images.
        </p>
      </div> */}
      <AllProductList products={productso} counter={counter} likes={likes} />
      <div className="mb-5">
        <Pagination
          itemsCount={products.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
