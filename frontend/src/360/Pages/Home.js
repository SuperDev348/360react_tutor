import React, { useState, useEffect } from "react";
import Frame from "../Pages/FrameLoginHomePage";
import imaga from "../Assets/360i.jpg";
import styled from "styled-components";
import { media } from "../styled";
import { useHistory } from "react-router-dom";
import style360 from "../style360.css";
import { Button } from "reactstrap";
import { UserContext } from "../context/user";
import { User } from "react-feather";
import mock1 from "../Assets/mock1.jpg";
import Loading from "../Pages/Loading";
import Carousel, { arrowsPlugin } from "@brainhubeu/react-carousel";
import img1 from "../Assets/nice.jpg";
import img2 from "../Assets/shutterstock_571310962.jpg";
import thumb1 from "../Assets/thumb1jpg.jpg";
import thumb2 from "../Assets/thumb2..jpg";
import thumb3 from "../Assets/thumb3..jpg";
import Elias from "../Assets/elias.jpg";
import Loading1 from "../../components/@vuexy/spinner/Loading-spinner";
import "@brainhubeu/react-carousel/lib/style.css";
import {
  XCircle,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Info,
  Lock,
  Maximize,
  Minimize,
  Settings,
  Edit,
  PlayCircle,
  
} from "react-feather";
export default function Home() {
  const history = useHistory();
  const { user } = React.useContext(UserContext);
  const [rotation, setrotation] = useState(true);
  const [imagesCarousel, setimagesCarousel] = useState(img1);
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(false);
  const [image, setImage] = useState(""); // this we be added with getplaces/ the image we added with addThreeSixty form
  React.useEffect(() => {
    setInterval(() => {
      setLoading(false);
    }, 500);
  });

  const change1 = (image) => {
    setLoading1(true);
    setInterval(() => {
      setLoading1(false);
    }, 1000);
    setimagesCarousel(image);
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <Slider>
        <div className="slider">
          {rotation ? (
            <Frame
              image={imagesCarousel}
              // animation={`property: rotation; from:0 0 0; to: 0 360 0; loop: true; dur: 50000; `}
              enabled="true"
              zoom="1"
              fov="80"
            />
          ) : (
            <Frame
              image={imagesCarousel}
              enabled="false"
              // animation={`property: rotation; from:0 0 0; to: 0 360 0; loop: true; dur: 50000; enabled:false;`}
              zoom="1"
              fov="80"
            />
          )}
        </div>
        <div className="cover1" />
        <div className="cover-text">
          <h1
            style={{
              color: "white",
            }}
          >
            360° Virtual Tour Creator, Create & publish your virtual tours
            Online, it is Free
          </h1>
          <div className="button-row">
            <div className="btnn">
              {user.user ? (
                <Button.Ripple
                  color="primary"
                  className="mr-1 mb-1"
                  size="lg"
                  onClick={() => {
                    history.push("/pages/HomePage");
                  }}
                  onMouseOut={() => {
                    return setrotation(true);
                  }}
                  onMouseOver={() => {
                    return setrotation(false);
                  }}
                >
                  {" "}
                  DASHBOARD
                </Button.Ripple>
              ) : (
                <Button.Ripple
                  color="primary"
                  className="mr-1 mb-1"
                  size="lg"
                  onClick={() => {
                    history.push("/login");
                  }}
                  onMouseOut={() => {
                    return setrotation(true);
                  }}
                  onMouseOver={() => {
                    return setrotation(false);
                  }}
                >
                  {" "}
                  SIGN IN
                </Button.Ripple>
              )}
            </div>

            <div className="btnn1">
              <Button.Ripple
                color="primary"
                className="mr-1 mb-1"
                size="lg"
                onClick={() => {
                  history.push("/alltours");
                }}
                onMouseOut={() => {
                  return setrotation(true);
                }}
                onMouseOver={() => {
                  return setrotation(false);
                }}
              >
                {" "}
                EXPLORE 360
              </Button.Ripple>
            </div>
          </div>
        </div>
        {loading1 ? (
          <div
            className="loaderimagescarousel"
            style={{
              zIndex: "11111",
              position: "absolute",
              left: "50%",
              top: "75%",
            }}
          >
            <Loading1 />
          </div>
        ) : (
          ""
        )}

        {
          <div className="carouseldown">
            <Carousel
              arrows
              infinite
              animationSpeed={100}
              offset={10}
              itemWidth={50}
              plugins={["arrows"]}
            >
              <div
                className={`${
                  imagesCarousel === imaga ? "active" : "notactive"
                }`}
              >
                <img
                  className="image1"
                  src={thumb1}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50px",
                    cursor: "pointer",
                    objectFit: "cover",
                  }}
                  onMouseOut={() => {
                    return setrotation(true);
                  }}
                  onMouseOver={() => {
                    return setrotation(false);
                  }}
                  onClick={() => change1(imaga)}
                />
              </div>
              <div
                className={`${
                  imagesCarousel === img1 ? "active" : "notactive"
                }`}
              >
                <img
                  className="image1"
                  src={thumb3}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50px",
                    cursor: "pointer",
                    objectFit: "cover",
                  }}
                  onMouseOut={() => {
                    return setrotation(true);
                  }}
                  onMouseOver={() => {
                    return setrotation(false);
                  }}
                  onClick={() => change1(img1)}
                />
              </div>

              <div
                className={`${
                  imagesCarousel === img2 ? "active" : "notactive"
                }`}
              >
                <img
                  className="image1"
                  src={thumb2}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50px",
                    cursor: "pointer",
                  }}
                  onMouseOut={() => {
                    return setrotation(true);
                  }}
                  onMouseOver={() => {
                    return setrotation(false);
                  }}
                  onClick={() => change1(img2)}
                />
              </div>
            </Carousel>
            <img
              src={Elias}
              alt=""
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50px",
                position: "absolute",
                right: "10px",
                bottom: "10px",
                zIndex: "1111111",
                border: "4px solid white",
                cursor: "pointer",
                boxShadow:
                  "0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)",
              }}
              onClick={() =>
                history.push("/UserProfileId/5f7a5a89bbe37956c83a31db")
              }
            />
            <span
              style={{
                color: "white",
                width: "50px",
                height: "30px",
                borderRadius: "50px",
                position: "absolute",
                right: "140px",
                bottom: "0px",
                zIndex: "1111111",
                whiteSpace: "nowrap",
              }}
            >
              Elias Khshaiboun
            </span>
          </div>
        }
      </Slider>
      <About>
        <div className="about-cont">
          <h1>Walkin360</h1>

          <p>
            A powerful application for unlimited creativity Theasys builds the
            most powerful and flexible tools for anyone to create and publish a
            360° Virtual Tour. Whether your are a Real Estate Agent, 360°
            photographer, web designer, hotelier or travel agency, Theasys'
            Application with its unmatched functionality, ease of use and
            professional approach helps you create the most beautiful & elegant
            panoramic tours for your users. Thousands of individuals, amateurs &
            professionals, from around the world are more creative and selling
            faster by building their Virtual Tours on Theasys.
          </p>
        </div>
      </About>
      <div>
        <div style={{ display: "grid", gridTemplateColumns: "auto auto" }}>
          {/* <div>
            <img src={mock1} style={{ width: "auto", height: "100vh" }} />
          </div> */}
        </div>
      </div>
    </div>
  );
}

const Slider = styled.div`
  .carouseldown {
  }
  .image {
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16),
      0 2px 10px 0 rgba(0, 0, 0, 0.12);
  }
  .image1:hover {
    opacity: 0.8;

    transition: all 0.2s;
  }
  .active {
    border: 3px solid white;
    border-radius: 50px;
  }
  .notactive {
  }
  .BrainhubCarousel__container {
    width: 263px;
    position: absolute;
    bottom: 10%;
    left: 50%;

    transform: translate(-53%, 50%);
    /* background-color: rgba(0, 0, 0, 0.6); */

    z-index: 2;

    /* background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 0.4713235636051295) 100%
    ); */
  }
  .BrainhubCarousel__arrows {
    background-color: transparent !important;
    outline: none;
  }
  .slider {
    width: 95vw;
    height: calc(100vh - 55px);
    height: 100vh;
  }
  .cover1 {
    background: black;
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    opacity: 0.7;
    z-index: 1;
  }
  .cover-text {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 60%;
    /* height: 30%; */
    transform: translate(-50%, -50%);
    color: white !important;
    font-size: 30px;
    text-align: center;
    z-index: 10;
  }
  .button-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding-top: 3rem;
    justify-items: center;

    gap: 1rem;
  }
  .btnn {
    justify-self: end;
  }
  .btnn1 {
    justify-self: start;
  }
  ${media.phone`
  .button-row {
    display: grid;
    grid-template-columns: 1fr;
    padding-top: 3rem;
    justify-items: center;

    gap: 1rem;
  }
  .btnn {
    justify-self: center;
  }
  .btnn1 {
    justify-self: center;
  }
  `}
  .cover-text h1 {
    font-size: 15px;
  }
  ${media.tablet`
  .button-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding-top: 3rem;
    justify-items: center;

    gap: 1rem;
  }
  .btnn {
    justify-self: end;
  }
  .btnn1 {
    justify-self: start;
  }
  .cover-text h1 {
    font-size: 20px;
  }
  `}

  ${media.desktop`
  .button-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding-top: 3rem;
    justify-items: center;

    gap: 1rem;
  }  .btnn {
    justify-self: end;
  }
  .btnn1 {
    justify-self: start;
  }
  .cover-text h1 {
    font-size: 30px;
  }
  `}

  ${media.large`
  .button-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding-top: 3rem;
    justify-items: center;

    gap: 1rem;
  }
  .btnn {
    justify-self: end;
  }
  .btnn1 {
    justify-self: start;
  }
  .cover-text h1 {
    font-size: 30px;
  }
  `}
`;
const About = styled.div`
  .about-cont {
    height: 50vh;
    margin: 0 auto;
    padding: 4rem 20rem;
    text-align: center;
  }
  .about-cont h1 {
    padding: 2rem;
  }
  ${media.phone`
  .about-cont {
    height: 50vh;
    margin: 0 auto;
    padding: 4rem 2rem;
    text-align: center;
  }
  .loaderimagescarousel{
    display:none;
  }
  `}
  ${media.tablet`
  .about-cont {
    height: 50vh;
    margin: 0 auto;
    padding: 4rem 2rem;
    text-align: center;
  }
  `}
  ${media.desktop`
  .about-cont {
    height: 50vh;
    margin: 0 auto;
    padding: 4rem 20rem;
    text-align: center;
  }
  `}
  ${media.large`
  .about-cont {
    height: 50vh;
    margin: 0 auto;
    padding: 4rem 20rem;
    text-align: center;
  }
  `}
`;
