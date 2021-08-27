import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "reactstrap";
import { useParams, useLocation, useHistory } from "react-router-dom";
import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumbAddTour";
import UserProductList from "../../360/Components/Products/UserProductList";
import Pagination from "../../components/@vuexy/Pagination/Pagination";
import { ProductContext } from "../../360/context/products";
import { UserContext } from "../../360/context/user";
import axios from "axios";
import imaga from "../../360/Assets/nice1.jpg";
import Loading from "../../360/Pages/Loading";
import ContentLoader, { Facebook } from "react-content-loader";
import { PlusCircle } from "react-feather";
import Frame from "../../360/Pages/FrameNoVirtual";
export default function VirtualTour() {
  const { products } = React.useContext(ProductContext);
  const history = useHistory();
  console.log(products);
  const MyLoader = (props) => (
    <ContentLoader
      speed={2}
      width={1200}
      height={500}
      viewBox="0 0 1200 500"
      backgroundColor="#0ca8fd"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
      <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
      <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
      <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
      <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
      <circle cx="20" cy="20" r="20" />
    </ContentLoader>
  );
  const { user } = React.useContext(UserContext);
  const { counter } = React.useContext(ProductContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [uid, setUid] = useState(user.user._id);
  const [userProducts, setUserProducts] = useState([]);
  const [loading, setloading] = useState(false);
  let UserProduct = products.filter((pro) => pro.userId == uid);
  React.useEffect(() => {
    showPlaces();
  }, []);
  const showPlaces = () => {
    setloading(true);
    axios
      .get(`http://localhost:5000/api/places/user/${uid}`, {
        params: { currentPage, pageSize },
      })
      .then((res) => {
        console.log(res.data);
        setUserProducts(res.data);
        setloading(false);
      });
  };
  let handlePageChange = (currentPage) => {
    console.log(currentPage);
    setCurrentPage(currentPage);
    setloading(true);
    axios
      .get(`http://localhost:5000/api/places/user/${uid}`, {
        params: { currentPage, pageSize },
      })
      .then((res) => {
        console.log(res.data);
        setUserProducts(res.data);
        setloading(false);
      });
  };

  // useeffect end
  // if (loading) {
  //   return MyLoader();
  //   setInterval(() => {
  //     setloading(false);
  //   }, 1000);
  // }

  if (loading) {
    return MyLoader();
  }

  {
    if (userProducts.length === 0) {
      {
        setInterval(() => {
          setloading(false);
        }, 1000);
      }

      return (
        <div>
          <Breadcrumbs
            breadCrumbTitle="Virtual Tours"
            breadCrumbParent="Dashboard"
            breadCrumbActive="Virtual Tours"
          />
          <Card>
            <Frame
              image={imaga}
              animation={`property: rotation; from:0 0 0; to: 0 360 0; loop: true; dur: 40000;`}
              zoom="1"
              fov="80"
            >
              {" "}
            </Frame>
            <div
              style={{
                width: "100%",
                height: "500px",
                backgroundColor: "black",
                opacity: "0.8",
                position: "absolute",
                top: "0px",
                left: "0px",
                zIndex: "1",
                display: "grid",
              }}
            >
              <div style={{ justifySelf: "center", alignSelf: "center" }}>
                <PlusCircle
                  style={{ zIndex: "2", cursor: "pointer" }}
                  size={100}
                  color="white"
                  onClick={() => history.push("/AddPlace")}
                ></PlusCircle>
                <h6
                  style={{
                    textAlign: "center",
                    color: "white",

                    textTransform: "uppercase",
                    justifySelf: "center",
                    position: "absolute",
                    left: "50%",
                    top: "62%",
                    transform: "translate(-50%,50%)",
                  }}
                >
                  create first tour
                </h6>
              </div>
            </div>
          </Card>
        </div>
      );
    }
  }
  return (
    <React.Fragment>
      <Row>
        <Col lg="12">
          {loading ? (
            MyLoader()
          ) : (
            <>
              <Breadcrumbs
                breadCrumbTitle="Virtual Tours"
                breadCrumbParent="Dashboard"
                breadCrumbActive="Virtual Tours"
              />
              <UserProductList products={userProducts} counter={counter} />
              <Pagination
                itemsCount={UserProduct.length}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </Col>
      </Row>
    </React.Fragment>
  );
}
