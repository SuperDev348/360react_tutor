import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Row, Col, Button, Spinner } from "reactstrap";
import BreadCrumbUsers from "../../../components/@vuexy/breadCrumbs/BreadCrumbUsers";
import ProfileHeader from "./ProfileHeader";
import AboutCard from "./AboutCard";
import SuggestedPages from "./SuggestedPages";
import TwitterFeed from "./TwitterFeeds";
import Posts from "./Posts";
import LatestPhotos from "./LatestPhotos";
import Suggestions from "./Suggestions";
import Polls from "./Polls";
import { UserContext } from "../../../360/context/user";
import "../../../assets/scss/pages/users-profile.scss";
import styled from "styled-components";
import axios from "axios";
import FramForNonSignUser from "../../../360/Pages/FramForNonSignUser";
import Loading from "../../../360/Pages/Loading";
import { ProductContext } from "../../../360/context/products";
import UserProductListFoRnonLogin from "../../../360/Components/Products/UserProductListFoRnonLogin";
export default function Profile() {
  const { products } = React.useContext(ProductContext);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = React.useContext(UserContext);
  const { id } = useParams();
  const [Allusers, setAllusers] = useState([]);
  const [userProducts, setUserProducts] = useState([]);

  React.useEffect(() => {
    setIsLoading(true);
    axios.get("http://localhost:5000/api/users/").then((response) => {
      setAllusers(response.data);
      console.log(response.data);
      setInterval(() => {
        setIsLoading(false);
      }, 500);
    });

    return () => {};
  }, []);

  React.useEffect(() => {
    showPlaces();
  }, []);

  const showPlaces = () => {
    setIsLoading(true);
    axios.get(`http://localhost:5000/api/places/user/${id}`).then((res) => {
      console.log(res.data);
      setUserProducts(res.data);
      setIsLoading(false);
    });
  };
  // const [userProducts, setuserProducts] = useState(
  //   products.filter((item) => {
  //     return item.userId === id;
  //   })
  // );

  // React.useEffect(() => {
  //   setuserProducts(
  //     products.filter((item) => {
  //       return item.userId === id;
  //     })
  //   );
  // }, []);

  // const [TourOne, setTourOne] = useState(
  //   userProducts.map((item) => {
  //     return JSON.parse(item.imgsData);
  //   })
  // );

  //   console.log(
  //     TourOne.map((item) => {
  //       return item.url;
  //     })
  //   );
  // console.log(TourOne[0][0].url);
  // const [FianlImage, setFianlImage] = useState(TourOne[0][0].url);
  const userProfile = Allusers.filter((item) => item._id === id);
  console.log(userProfile);
  const userName = userProfile.map((item) => {
    return item.username;
  });
  const image = userProfile.map((item) => {
    return item.image;
  });

  const bio = userProfile.map((item) => {
    return item.bio;
  });

  const email = userProfile.map((item) => {
    return item.email;
  });
  const webiste = userProfile.map((item) => {
    return item.website;
  });

  const facebook = userProfile.map((item) => {
    return item.facebook;
  });

  const twitter = userProfile.map((item) => {
    return item.twitter;
  });

  const instagram = userProfile.map((item) => {
    return item.instagram;
  });

  const google = userProfile.map((item) => {
    return item.google;
  });

  const linkid = userProfile.map((item) => {
    return item.linkid;
  });

  const name = userProfile.map((item) => {
    return item.name;
  });

  const username = userProfile.map((item) => {
    return item.username;
  });
  //   React.useEffect(() => {
  //     setTourOne(JSON.parse(userProducts.imgsData[0]));
  //   });
  const toggleLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 2000);
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <WholePage>
      <div>
        <React.Fragment>
          <div id="user-profile">
            <Row>
              <Col sm="12">
                <ProfileHeader image={image} userName={username} />
              </Col>
            </Row>
            <div className="wholePage">
              {/* <BreadCrumbUsers
                breadCrumbTitle="Profile"
                breadCrumbParent="All Users"
                breadCrumbActive="Profile"
              /> */}
              <div id="profile-info">
                <Row>
                  <Col lg="3" md="12">
                    <AboutCard
                      bio={bio}
                      email={email}
                      name={name}
                      username={username}
                      webiste={webiste}
                      facebook={facebook}
                      twitter={twitter}
                      instagram={instagram}
                      google={google}
                      linkid={linkid}
                    />
                  </Col>
                  <Col lg="6" md="12">
                    <div>
                      <UserProductListFoRnonLogin products={userProducts} />
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </React.Fragment>
      </div>
    </WholePage>
  );
}

const WholePage = styled.div`
  .wholePage {
    padding: 0rem 4rem;
  }
`;
