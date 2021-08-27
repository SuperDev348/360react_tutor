import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useLocation, useHistory } from "react-router-dom";
import { UserContext } from "../context/user";
import Frame from "../../360/Pages/Frame";
import { ProductContext } from "../context/products";
import styled from "styled-components";
import ContentLoader, { Facebook } from "react-content-loader";
import Rotate from "../Assets/rotate.png";
import RotatNo from "../Assets/rotateNo.png";
import Loading from "../Pages/Loading";
import Loading1 from "../../components/@vuexy/spinner/Loading-spinner";
import IconButton from "@material-ui/core/IconButton";
import hdLogo from "../Assets/HD.png";
import Carousel, { Dots, slidesToShowPlugin } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import { FillSpinner } from "react-spinners-kit"; //spiners
import { Row, Col, FormGroup, Form, Input, Button, Label } from "reactstrap";

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
} from "react-feather";
import { makeStyles } from "@material-ui/core/styles";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import "../../assets/scss/pages/authentication.scss";
import {
  Image,
  Video,
  Transformation,
  CloudinaryContext,
} from "cloudinary-react";
import { LOD } from "three";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },

  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },

  root1: {
    width: "90%",
    margin: "1rem",
  },
  margin: {
    height: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "92%",
    marginLeft: 10,
    color: "red",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  select: {
    "&:before": {
      borderColor: "#000000",
      height: "5px",
    },
    "&:after": {
      borderColor: "#0ca8fd",
      height: "5px",
    },
  },
  formControl2: {
    margin: theme.spacing(1),
    minWidth: "100%",
    marginLeft: 0,
    color: "red",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  select: {
    "&:before": {
      borderColor: "#000000",
      height: "5px",
    },
    "&:after": {
      borderColor: "#0ca8fd",
      height: "5px",
    },
  },
  opacitySlider: {
    width: "100%",
  },
  exitbtn: {
    "& > *": {
      margin: theme.spacing(1),
      padding: "0.7rem 0.5rem",
    },

    outline: "none!important",
  },
}));
export default function ThreeSixtyTour() {
  const { user } = React.useContext(UserContext); // we will use it
  const handle = useFullScreenHandle();
  const classes = useStyles();
  const { products } = React.useContext(ProductContext);
  const { userLogin } = React.useContext(UserContext);
  const history = useHistory();
  const { id } = useParams();
  const product = products.filter((item) => item.id === id);
  const [title, settitle] = useState(product.map((item) => item.title));
  const [hd, setHd] = useState(false);
  const [description, setdescription] = useState(
    product.map((item) => item.description)
  );
  const [havePassword, sethavePassword] = useState(
    product.map((item) => item.havePassword)
  );
  const [passwordo, setpasswordo] = useState(
    product.map((item) => item.passwordo)
  );
  const [featuredImage, setfeaturedImage] = useState(
    product.map((item) => item.image)
  );
  const [featuredImageFinal, setFeaturedImageFinal] = useState();

  const [rotationSpeed, setrotationSpeed] = useState(
    product.map((item) => item.rotationSpeed)
  );

  const [rotation, setrotation] = useState(
    product.map((item) => item.rotation)
  );
  const [rotationWas, setRotationWas] = useState(
    product.map((item) => item.rotation)
  );
  const [openDescription, setopenDescription] = useState(
    product.map((item) => item.openDescription)
  );
  const [loop, setLoop] = useState(product.map((item) => item.loop));
  const [direction, setdirection] = useState(
    product.map((item) => item.direction)
  );
  const [zoom, setZoom] = useState(product.map((item) => item.zoom));
  const [userPassword, setUserPassword] = useState("");
  const [pause, setPause] = useState(product.map((item) => item.pause));
  const [showImageFeaturedInPause, setshowImageFeaturedInPause] = useState(
    product.map((item) => item.showImageFeaturedInPause)
  );
  const [playicon, setplayicon] = useState(
    product.map((item) => item.playicon)
  );
  const [disTourTitle, setdisTourTitle] = useState(
    product.map((item) => item.disTourTitle)
  );

  const [pauseOpacity, setpauseOpacity] = useState(
    product.map((item) => item.pauseOpacity)
  );
  const [cssTourTitle, setCssTourTitle] = useState(
    product.map((item) => item.cssTourTitle)
  );
  const [openCarousel, setopenCarousel] = useState(
    product.map((item) => item.openCarousel)
  );
  const [carouselWasOpen, setCarouselWasOpen] = useState();
  const [infoButtonIsActive, setInfoButtonIsActive] = useState(true);
  const [carouselDesing, setcarouselDesing] = useState(
    product.map((item) => item.carouselDesing)
  );
  const [puplicId, setPuplicId] = useState("");

  const [css, setCss] = useState(true);
  const [css1, setCss1] = useState(true);
  const [loading, setLoading] = useState(true); // this will show the loading component
  // const [tourPlaces, setTourPlaces] = useState([]); // this will show all the places we added inside the addthreesixty form
  const [image, setImage] = useState([]); // this we be added with getplaces/ the image we added with addThreeSixty form
  const [imageURL, setImageURL] = useState([]);
  const [imageCard, setImageCard] = useState(null);
  const [imageTitle, setImageTitle] = useState("");
  const [imageDescription, setImageDescription] = useState("");
  const [ifItWasFullScreen, setifItWasFullScreen] = useState(false);
  const [ifItWasSmallScreen, setifItWasSmallScreen] = useState(true);
  const [imageURLHd, setImageURLHd] = useState([]);
  const [imageURLSd, setImageURLSd] = useState("");
  const [startaActivePano, setstartaActivePano] = useState("0"); // define with panorama to start on startup
  const [displayTitleBesideThumb, setDisplayTitleBesideThumb] = useState(true); // difne is to show title beside the thumbnail
  const [showCompanyTitle, setShowCompanyTitle] = useState(true); // define if we wantt to show company title in the pause
  const [compnyTitle, setCompnyTitle] = useState("WALKIN"); // define the company title.
  const [showCompanyTitleWithUrl, setshowCompanyTitleWithUrl] = useState(false); // if we will show company title with url
  const [companyUrl, setcompanyUrl] = useState("https://walkin-360.com/"); // company url,
  const [spinnerColor, setspinnerColor] = useState("#008000"); // spinner color
  const [spinnerSize, setSpinnerSize] = useState("100"); // spinner size
  const [preloaderIcon, setpreloaderIcon] = useState(
    <FillSpinner color={spinnerColor} size={spinnerSize} />
  ); // choose spinner
  const [nadir, setnadir] = useState(true); // define if we will use nadir .
  const [nadirImage, setnadirImage] = useState(
    "/static/media/Best-15.fae96415.jpg"
  ); // fefine the nadir image
  const [nadirScale, setnadirScale] = useState(".5 .5 .5 "); // deifne the nadir size
  const [nadirOpacity, setnadirOpacity] = useState("0.5"); // define nadir opacity
  const [style1, setStyle1] = useState("small-image-button"); //small-image-button
  const [isMobile, setisMobile] = useState(""); // define if the user use mobile or dekstop
  const [activeImageCarousel, setActiveImageCarousel] = useState(false);
  const [activeImage, setActiveImage] = useState();
  // here you can change the quality when HD is false
  let imageQ = 50;

  // loader
  const MyLoader = (props) => (
    <ContentLoader
      speed={2}
      width={476}
      height={400}
      viewBox="0 0 476 400"
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
  // loader style

  const HandelInfo = () => {
    setopenDescription(true);
    setInfoButtonIsActive(false);
    if (openCarousel) {
      setCarouselWasOpen(true);
      setopenCarousel(false);
    }
    if (!openCarousel) {
      setCarouselWasOpen(false);
    }

    if (rotation) {
      setRotationWas(true);
      setrotation(false);
    }
    if (!rotation) {
      setRotationWas(false);
    }
  };

  const close = () => {
    setopenDescription(false);
    if (carouselWasOpen) {
      setopenCarousel(true);
    }
    if (!carouselWasOpen) {
      setopenCarousel(false);
    }
    if (rotationWas) {
      setrotation(true);
    }
    if (!rotationWas) {
      setrotation(false);
    }
    setInfoButtonIsActive(true);
  };
  const big = () => {
    return handle.enter();
  };

  // const big = () => {
  //   return (
  //     setifItWasFullScreen(true), handle.enter(), setifItWasSmallScreen(false)
  //   );
  // };
  const getPlaces = () => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/places/${id}`)
      .then((res) => {
        let img = JSON.parse(res.data.place.imgsData[0])[0];
        let qImg = { ...img };
        console.log(res.data);
        console.log(JSON.parse(res.data.place.imgsData[0]));
        console.log(img.public_id);
        setImage(JSON.parse(res.data.place.imgsData[0]));
        setImageTitle(JSON.parse(res.data.place.imgsData[0])[0].title);
        setImageDescription(
          JSON.parse(res.data.place.imgsData[0])[0].description
        );
        console.log();
        setImageCard(JSON.parse(res.data.place.image));
        setFeaturedImageFinal(JSON.parse(res.data.place.image));
        console.log(img);
        qImg.url = img.url.replace("upload/", `upload/q_${imageQ}/`);
        setImageURLHd(img);
        setImageURLSd(qImg);
        setImageURL(img);
        setPuplicId(img.public_id);
        settitle(res.data.place.title);
        setrotation(res.data.place.rotation);
        setrotationSpeed(res.data.place.rotationSpeed);
        setdescription(res.data.place.description);
        setopenDescription(res.data.place.openDescription);
        setpasswordo(res.data.place.passwordo);
        sethavePassword(res.data.place.havePassword);
        setfeaturedImage(res.data.place.image);
        setdirection(res.data.place.direction);
        setLoop(res.data.place.loop);
        setZoom(res.data.place.zoom);
        setPause(res.data.place.pause);
        setdisTourTitle(res.data.place.disTourTitle);
        setpauseOpacity(res.data.place.pauseOpacity);
        setCssTourTitle(res.data.place.cssTourTitle);
        setshowImageFeaturedInPause(res.data.place.showImageFeaturedInPause);
        setplayicon(res.data.place.playicon);
        setActiveImage(res.data.place.activeImage);
        setInterval(() => {
          setLoading(true);
        }, 1000);
      })
      .catch((error) => {
        history.push("/");
      });
  };
  React.useEffect(() => {
    getPlaces();
  }, []);
  image.length > 0 ? console.log(image) : console.log("still uploading");
  console.log(imageURLHd);

  const PasswordCheck = (password, userpassword, css) => {
    console.log(userpassword);
    if (password == userpassword) {
      console.log("password correct");
      setCss(false);
      setCss1(false);
    } else console.log("password false");
  };

  // if (loading) {
  //   return (
  //     <div
  //       style={{
  //         position: "absolute",
  //         top: "50%",
  //         left: "50%",
  //         transform: "translate(-50%, -50%)",
  //       }}
  //     >
  //       <div>
  //         <Loading />
  //       </div>
  //     </div>
  //   );
  // }

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {!loading && (
        <div className="all-page">
          <FullScreen handle={handle}>
            <div>
              {/* description */}
              <div>
                {openDescription && (
                  // if the information background is open, what to show, here we talk about title of tour and description of tour
                  <div>
                    <Title>
                      <div
                        className="black-background"
                        style={{
                          width: "100vw",
                          height: "100vh",
                          // backgroundColor: "black",
                          position: "fixed",
                          top: "0px",
                          left: "0px",
                          zIndex: "19",
                          // opacity: "0.5",
                        }}
                      ></div>
                      <div className="containers">
                        <XCircle
                          className="close1"
                          onClick={close}
                          color="#0ca8fd"
                        />
                        <div>
                          <img
                            src={imageCard.uploadInfo.url}
                            alt=""
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "25px 0px 0px 25px",
                              objectFit: "cover",

                              justifySelf: "center",
                            }}
                          />
                        </div>
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "auto auto auto",
                          }}
                        >
                          <div>
                            <div className="title">
                              {imageTitle ? imageTitle : title}
                            </div>

                            <div className="descrition">
                              {imageDescription
                                ? imageDescription
                                : description}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Title>
                  </div>
                )}
              </div>
              {/* end description */}
              {!pause && ( // if we are on pause, mean we have pasue start screen. if we are not on pause screen then to show home and dinfromation buttons
                <Btn>
                  <div className="top-shadow" />
                  <div className="container-top-left">
                    <div className={classes.exitbtn}>
                      <IconButton
                        aria-label="delete"
                        style={{
                          outline: "none",
                          backgroundColor: "rgba(255,0,0,0.0)",
                        }}
                      >
                        <ArrowLeft
                          onClick={() => {
                            history.push("/VirtualTour");
                          }}
                          size={25}
                          style={{
                            color: "white",
                            backgroundColor: "rgba(255,0,0,0.0)",
                          }}
                        />
                      </IconButton>
                      {infoButtonIsActive ? (
                        <IconButton
                          aria-label="delete"
                          style={{
                            outline: "none",
                            backgroundColor: "rgba(255,0,0,0.0)",
                          }}
                        >
                          <Info
                            onClick={HandelInfo}
                            size={25}
                            style={{
                              color: "white",
                              backgroundColor: "rgba(255,0,0,0.0)",
                            }}
                          />
                        </IconButton>
                      ) : (
                        <IconButton
                          disabled
                          aria-label="delete"
                          style={{
                            outline: "none",
                            backgroundColor: "rgba(255,0,0,0.0)",
                          }}
                        >
                          <Info
                            onClick={HandelInfo}
                            size={25}
                            style={{
                              color: "white",
                              backgroundColor: "rgba(255,0,0,0.0)",
                              opacity: "0.5",
                            }}
                          />
                        </IconButton>
                      )}
                    </div>
                    <div className="title-tour">
                      <h5>{title}</h5>
                    </div>
                    <div className="top-bar">
                      <div className={classes.exitbtn}>
                        <>
                          {!pause && rotation ? (
                            <IconButton
                              aria-label="delete"
                              style={{
                                outline: "none",
                                backgroundColor: "rgba(255,0,0,0.0)",
                              }}
                            >
                              <img
                                src={Rotate}
                                onClick={() => {
                                  return setrotation(false);
                                }}
                                size={25}
                                style={{
                                  color: "white",
                                  backgroundColor: "rgba(255,0,0,0.0)",
                                  width: "27px",
                                  height: "25px",
                                  position: "fixed",
                                  top: "20px",
                                  right: "20px",
                                }}
                              />
                            </IconButton>
                          ) : (
                            <IconButton
                              aria-label="delete"
                              style={{
                                outline: "none",
                                backgroundColor: "rgba(255,0,0,0.0)",
                              }}
                            >
                              <img
                                src={RotatNo}
                                onClick={() => {
                                  return setrotation(true);
                                }}
                                size={25}
                                style={{
                                  color: "white",
                                  backgroundColor: "rgba(255,0,0,0.0)",
                                  width: "27px",
                                  height: "25px",
                                  position: "fixed",
                                  top: "20px",
                                  right: "20px",
                                }}
                              />
                            </IconButton>
                          )}
                          <div className="top-bar">
                            <>
                              {hd ? (
                                <IconButton
                                  aria-label="delete"
                                  style={{
                                    outline: "none",
                                    backgroundColor: "rgba(255,0,0,0.0)",
                                  }}
                                  onClick={() => {
                                    return setHd(false);
                                  }}
                                >
                                  <div
                                    style={{
                                      backgroundColor: "green",
                                      position: "fixed",
                                      width: "7px",
                                      height: "7px",
                                      zIndex: "1111",
                                      borderRadius: "7px",

                                      top: "20px",
                                      right: "60px",
                                    }}
                                  ></div>
                                  <img
                                    src={hdLogo}
                                    style={{
                                      color: "white",
                                      backgroundColor: "rgba(255,0,0,0.0)",
                                      // width: "27px",
                                      height: "23px",

                                      position: "fixed",
                                      top: "23px",
                                      right: "63px",
                                    }}
                                  ></img>
                                </IconButton>
                              ) : (
                                <>
                                  <IconButton
                                    aria-label="delete"
                                    style={{
                                      outline: "none",
                                      backgroundColor: "rgba(255,0,0,0.0)",
                                    }}
                                    onClick={() => {
                                      return setHd(true);
                                    }}
                                  >
                                    {" "}
                                    <div
                                      style={{
                                        backgroundColor: "red",
                                        position: "fixed",
                                        width: "7px",
                                        height: "7px",
                                        zIndex: "1111",
                                        borderRadius: "7px",
                                        opacity: "0.7",
                                        top: "20px",
                                        right: "60px",
                                      }}
                                    ></div>
                                    <img
                                      src={hdLogo}
                                      style={{
                                        color: "white",
                                        backgroundColor: "rgba(255,0,0,0.0)",
                                        // width: "27px",
                                        height: "23px",
                                        opacity: "0.4",
                                        position: "fixed",
                                        top: "23px",
                                        right: "63px",
                                      }}
                                    ></img>
                                  </IconButton>
                                </>
                              )}
                              {ifItWasSmallScreen && (
                                <IconButton
                                  aria-label="delete"
                                  style={{
                                    outline: "none",
                                    backgroundColor: "rgba(255,0,0,0.0)",
                                  }}
                                  onClick={() => (
                                    setifItWasFullScreen(true),
                                    handle.enter(),
                                    setifItWasSmallScreen(false)
                                  )}
                                >
                                  {console.log(ifItWasFullScreen)}
                                  <Maximize
                                    style={{
                                      color: "white",
                                      backgroundColor: "rgba(255,0,0,0.0)",
                                      // width: "27px",
                                      height: "23px",
                                      opacity: "1",
                                      position: "fixed",
                                      top: "23px",
                                      right: "105px",
                                    }}
                                  ></Maximize>
                                </IconButton>
                              )}

                              {ifItWasFullScreen && (
                                <IconButton
                                  aria-label="delete"
                                  style={{
                                    outline: "none",
                                    backgroundColor: "rgba(255,0,0,0.0)",
                                  }}
                                  // onClick={
                                  //   (() => setFullScreen(false), handle.exit)
                                  // }
                                  onClick={() => (
                                    setifItWasFullScreen(false),
                                    handle.exit(),
                                    setifItWasSmallScreen(true)
                                  )}
                                >
                                  <Minimize
                                    style={{
                                      color: "white",
                                      backgroundColor: "rgba(255,0,0,0.0)",
                                      // width: "27px",
                                      height: "23px",
                                      opacity: "1",
                                      position: "fixed",
                                      top: "23px",
                                      right: "105px",
                                    }}
                                  ></Minimize>
                                </IconButton>
                              )}

                              {/* buttons that will show only for the admin of the tour */}
                              {
                                <>
                                  <IconButton
                                    aria-label="delete"
                                    style={{
                                      outline: "none",
                                      backgroundColor: "rgba(255,0,0,0.0)",
                                    }}
                                    onClick={() => {
                                      history.push("/EditTour", {
                                        prooduct: {
                                          id,
                                          title,

                                          image,
                                        },
                                      });
                                    }}
                                  >
                                    <Settings
                                      style={{
                                        color: "white",
                                        backgroundColor: "rgba(255,0,0,0.0)",
                                        // width: "27px",
                                        height: "23px",
                                        opacity: "1",
                                        position: "fixed",
                                        top: "23px",
                                        right: "150px",
                                      }}
                                    ></Settings>
                                  </IconButton>
                                  <IconButton
                                    aria-label="delete"
                                    style={{
                                      outline: "none",
                                      backgroundColor: "rgba(255,0,0,0.0)",
                                    }}
                                    onClick={() => {
                                      history.push(`/EditPictures/${id}`, {
                                        product: {
                                          id,
                                        },
                                      });
                                    }}
                                  >
                                    <Edit
                                      style={{
                                        color: "white",
                                        backgroundColor: "rgba(255,0,0,0.0)",
                                        // width: "27px",
                                        height: "23px",
                                        opacity: "1",
                                        position: "fixed",
                                        top: "23px",
                                        right: "195px",
                                      }}
                                    ></Edit>
                                  </IconButton>
                                </>
                              }
                            </>
                          </div>
                        </>
                      </div>
                    </div>
                  </div>
                </Btn>
              )}

              <Tour>
                {/* // if we define to have rotation the 360 , then what will show, we will go for checking the nadir , if we have nadir or not. */}
                {!loading && nadir && rotation ? (
                  <div onMouseDown={(e) => setrotation(false)}>
                    <Frame
                      image={hd ? imageURLHd.url : imageURLSd.url}
                      animation={`property: rotation; from:0 0 0; to: 0 360 0; loop: ${loop}; dur: ${rotationSpeed}; dir:${direction}; easing :easeOutBack	;`}
                      zoom={zoom}
                      nadir={nadirImage}
                      nadirScale={nadirScale}
                      nadirOpacity={nadirOpacity}
                      loading={true}
                    />
                  </div>
                ) : (
                  <div>
                    <Frame
                      image={hd ? imageURLHd.url : imageURLSd.url}
                      zoom={zoom}
                    />
                  </div>
                )}

                {!pause && showCompanyTitleWithUrl && showCompanyTitle ? (
                  <div className="company-title">
                    <p>
                      <a href={companyUrl}>{compnyTitle}</a>
                    </p>
                  </div>
                ) : (
                  ""
                )}

                {pause ? ( // here we checking if we are in pasue , if yes , then we will go for other check, if we will show featured image in the pause screen, if not to show him image that we will define, background, black screen, we need to dfine those
                  <>
                    <div
                      style={{
                        width: "100vw",
                        height: "100vh",
                        position: "fixed",
                        left: "0px",
                        top: "0px",
                        zIndex: "11",
                      }}
                    >
                      {showImageFeaturedInPause ? (
                        <img
                          src={featuredImage}
                          className="image-background-on-pause"
                        />
                      ) : (
                        ""
                      )}

                      <div
                        style={{
                          backgroundColor: "black",

                          width: "100vw",
                          height: "100vh",
                          position: "fixed",
                          left: "0px",
                          top: "0px",
                          zIndex: "10",
                          opacity: pauseOpacity,
                        }}
                      ></div>
                      <div
                        onClick={() => {
                          return (
                            setPause(false),
                            setLoading(true),
                            setInterval(() => {
                              setLoading(false);
                            }, 100)
                          );
                        }}
                      >
                        {disTourTitle && (
                          <h1 className={cssTourTitle}>
                            {
                              title // here we checking if we will disply tour title, if not what to show
                            }
                          </h1>
                        )}

                        <img src={playicon} alt="Play" className="play-btn" />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="not-pause"></div>
                )}
              </Tour>
              {/* // here we define if not pause, to show the carousel */}
              <Circle1>
                <div>
                  {!pause && openCarousel ? ( // here we define if the carousel is start with open or close status
                    <div className="carousel">
                      <Carousel
                        slidesPerPage={3}
                        // onChange={() => setActiveImage(true)}
                        offset={10}
                        draggable
                        itemWidth={200}
                      >
                        {image.length > 0
                          ? image.map((p) => {
                              return (
                                <>
                                  {loading ? (
                                    <div
                                      style={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)",
                                      }}
                                    >
                                      {<Loading />}
                                    </div>
                                  ) : (
                                    <div
                                      // url image
                                      style={{ cursor: "pointer" }}
                                      className={carouselDesing}
                                      onDoubleClick={() => {
                                        setLoading(true);
                                        // big();
                                        // alert(ifItWasFullScreen);
                                        // setActiveImage(true);
                                        setZoom(zoom);
                                        setImageURLHd(p);
                                        let qImg = { ...p };

                                        qImg.url = p.url.replace(
                                          "upload/",
                                          `upload/q_${imageQ}/`
                                        );

                                        setImageURLSd(qImg);
                                        setImageTitle(p.title);
                                        setImageDescription(p.description);
                                        setInterval(() => {
                                          setLoading(false);
                                        }, 1000);
                                      }}
                                    >
                                      <div
                                        className={`${
                                          p.thumbnail_url ==
                                            imageURLHd.thumbnail_url ||
                                          p.thumbnail_url ==
                                            imageURLSd.thumbnail_url
                                            ? "activeImage"
                                            : "notActiveImage"
                                        }`}
                                      >
                                        <img
                                          src={p.thumbnail_url}
                                          className="picture-image"
                                          width="200"
                                        ></img>
                                        <div className="image-overlay"></div>

                                        {displayTitleBesideThumb && ( // here we define if there is title inside the carousel
                                          <h1 className="left-title">
                                            {p.title
                                              ? p.title
                                              : p.original_filename}
                                          </h1>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </>
                              );
                            })
                          : console.log("no")}
                      </Carousel>

                      <div
                        className="close-carousel"
                        onClick={() => {
                          return setopenCarousel(false);
                        }}
                      >
                        <ChevronDown size={35} color="white" />
                      </div>
                    </div>
                  ) : (
                    <div
                      className="open-carousel"
                      onClick={() => {
                        return setopenCarousel(true);
                      }}
                    >
                      <ChevronUp size={35} color="white" />
                    </div>
                  )}
                </div>
              </Circle1>
              <LockPage>
                {havePassword ? (
                  <>
                    <div className={css1 ? "black-back" : "black-back-none"}>
                      {" "}
                    </div>
                    <div
                      className={
                        css ? "lockPage-container" : "lockPage-container-none"
                      }
                    >
                      <div className="left-image">
                        <img
                          src={featuredImageFinal.uploadInfo.url}
                          alt=""
                          style={{
                            width: "100%",
                            height: "100%",
                            // border: "2px solid black",
                            objectFit: "cover",
                          }}
                        />
                      </div>

                      <div className="main-form-container">
                        <div>
                          <h3 style={{ textTransform: "uppercase" }}>
                            {title}
                          </h3>
                        </div>
                        <div>
                          <h5>Please insert the password</h5>
                        </div>

                        <div>
                          {/* <input
                        type="text"
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                      />

                      <button
                        onClick={() => PasswordCheck(password, userPassword)}
                      >
                        clikck
                      </button> */}

                          <Row className="justify-content-md-center mt-2">
                            <Col lg="6" md="12" mt="12">
                              <FormGroup className="position-relative form-label-group has-icon-left">
                                <Input
                                  type="text"
                                  value={userPassword}
                                  onChange={(e) =>
                                    setUserPassword(e.target.value)
                                  }
                                  placeholder="Insert Password"
                                />
                                <div className="form-control-position">
                                  <Lock size={15} />
                                </div>
                                <Label>Insert Password</Label>
                              </FormGroup>
                              <Button.Ripple
                                color="primary"
                                onClick={() =>
                                  PasswordCheck(passwordo, userPassword)
                                }
                              >
                                Submit
                              </Button.Ripple>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </LockPage>
            </div>
          </FullScreen>
        </div>
      )}
    </>
  );
}
const LockPage = styled.div`
  .black-back {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: black;
    z-index: 12;
    opacity: 0.95;
  }
  .black-back-none {
    display: none;
  }
  .lockPage-container {
    background-color: white;
    width: 50%;
    height: 50%;
    left: 50%;
    top: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    z-index: 13;
    display: grid;
    grid-template-columns: 1fr 1fr;
    /* border: 2px solid red; */
  }
  .lockPage-container-none {
    display: none;
  }
  .main-form-container {
    width: 100%;
    height: 200px;
    align-self: center;
    justify-self: center;
    text-align: center;

    display: grid;
  }
`;
const Title = styled.div`
  .containers {
    position: absolute;
    display: grid;
    grid-template-columns: 40% 60%;
    /* padding: 3rem; */
    right: 50%;
    top: 50%;
    transform: translate(50%, -50%);
    width: 60%;
    height: 70%;
    z-index: 20;
    background-color: white;
    border-radius: 25px;
    -webkit-box-shadow: -5px -3px 5px -4px rgba(0, 0, 0, 0.52);
    -moz-box-shadow: -5px -3px 5px -4px rgba(0, 0, 0, 0.52);
    box-shadow: -5px -3px 5px -4px rgba(0, 0, 0, 0.52);
  }
  .black-background {
    background: rgb(0, 0, 0);
    background: radial-gradient(
      circle,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 0.4713235636051295) 100%
    );
  }

  .cover-about {
    position: fixed;
    padding: 3rem;
    right: 0px;
    top: 52px;
    width: 25%;
    height: 100vh;
    z-index: 10;
    background-color: black;
    opacity: 0.8;
  }
  .close1 {
    z-index: 11111;
    position: fixed;
    right: 15px;
    top: 15px;
    max-width: 30px;
    max-height: 30px;
    display: block;
    cursor: pointer;
  }

  .title {
    color: #0ca8fd;
    font-size: 20px;
    text-align: left;
    padding: 3rem 5rem;
    white-space: nowrap;
    text-transform: uppercase;
  }

  .descrition {
    color: #787878;
    font-size: 13px;
    position: relative;
    padding: 0rem 5rem;
    text-align: left;
  }
`;
const Btn = styled.div`
  .container-top-left {
    position: absolute;
    left: 7px;
    top: 7px;
    display: grid;
    grid-template-columns: auto auto auto;
    height: 50px;
    align-items: center;

    z-index: 11;
    justify-items: center;
  }
  .title-tour h5 {
    text-transform: uppercase;
    color: white;
    font-size: 1rem;
    margin-top: 5px;
    margin-left: 8px;
    user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -o-user-select: none;
  }

  .btn-info {
    z-index: 11;
    position: absolute;

    width: 30px;
    height: 30px;
    z-index: 10;
    cursor: pointer;
    font-family: "Titillium Web", sans-serif;
  }
  .btn-back {
    z-index: 11;
    position: absolute;

    width: 30px;
    height: 30px;
    z-index: 10;
    cursor: pointer;
    font-family: "Titillium Web", sans-serif;
  }
  .image {
    position: absolute;
    left: 2rem;
    top: 5rem;
    width: 30px;
    height: 30px;
    z-index: 10;
    cursor: pointer;
  }

  .information {
    border: none;
    border-radius: 0px;
    padding: 1rem;
    z-index: 11;
    cursor: pointer;
    background: green;
    font-size: 15px;
    font-weight: bold;
  }
  .top-bar {
    position: absolute;
    right: 0rem;
    top: 0rem;
    display: grid;
    grid-template-columns: auto auto auto;

    z-index: 11;
    justify-items: end;
    font-family: "Titillium Web", sans-serif;
  }
  .top-shadow {
    user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -o-user-select: none;
    position: fixed;
    top: 0px;
    width: 100%;
    height: 70px;
    left: 0px;
    z-index: 4;
    /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#000000+0,ffffff+100&0.54+0,0+100 */
    background: -moz-linear-gradient(
      top,
      rgba(0, 0, 0, 0.54) 0%,
      rgba(255, 255, 255, 0) 100%
    ); /* FF3.6-15 */
    background: -webkit-linear-gradient(
      top,
      rgba(0, 0, 0, 0.54) 0%,
      rgba(255, 255, 255, 0) 100%
    ); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.54) 0%,
      rgba(255, 255, 255, 0) 100%
    ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#8a000000', endColorstr='#00ffffff',GradientType=0 ); /* IE6-9 */
  }

  .hd {
    border: none;
    border-radius: 0px;
    padding: 1rem;
    z-index: 11;
    cursor: pointer;
    position: fixed;
    right: 0px;
    top: 112px;
    font-size: 15px;
    font-weight: bold;
  }
  .hd:after {
    content: "HD";
  }
`;
const Tour = styled.div`
  .pause {
    width: 100vw;
    height: 100vh;
    background-color: black;
    opacity: 0.6;
    position: fixed;
    left: 0px;
    top: 0px;
    z-index: 10;
  }
  .pause1 {
    width: 100vw;
    height: 100vh;
    background-color: black;
    opacity: 0.1;
    position: fixed;
    left: 0px;
    top: 0px;
    z-index: 10;
  }
  .play-btn {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    z-index: 10000;
    cursor: pointer;
  }
  .tour-title {
    position: absolute;
    left: 50%;
    top: 65%;
    transform: translate(-50%, -50%);
    color: White;
    z-index: 110000;
    cursor: pointer;
    text-transform: uppercase;
    font-size: 2rem;
    text-align: center;
  }
  .tourShadow {
    position: absolute;
    left: 50%;
    top: 65%;
    transform: translate(-50%, -50%);
    color: White;
    z-index: 110000;
    cursor: pointer;
    text-transform: uppercase;
    font-size: 2rem;
    text-align: center;
    text-shadow: 4px 4px 4px rgba(0, 0, 0, 1);
  }
  .company-title {
    position: absolute;
    left: 5%;
    top: 15%;
    transform: translate(-50%, -50%);
    color: White;
    z-index: 110000;
    cursor: pointer;
    text-transform: uppercase;
    font-size: 2rem;
  }
  .not-pause {
    display: none;
  }
  .image-background-on-pause {
    background-position: center;
    background-size: cover;
    width: 100vw;
    height: 100vh;
    object-fit: cover;
  }
`;
const Circle1 = styled.div`
  .carousel {
    user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -o-user-select: none;
  }
  .activeImage {
    opacity: 1;
  }
  .notActiveImage {
    opacity: 0.1;
  }
  .image-overlay1 {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: red;
    opacity: 0.6;
  }
  .image-overlay {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.3;
  }

  .small-image-button {
    border: none;
    /* border: 5px solid black; */
    display: flex;
    -webkit-flex-direction: column;
    flex-direction: column;
    float: left;
  }

  .small-image-button:hover .image-overlay {
    opacity: 0.5;
    border: 10px solid black;
    box-shadow: inset 0px 0px 0px 2px white;
    box-sizing: border-box; /* Include padding and border in element's width and height */
  }
  .small-image-button1 {
    border: none;

    display: flex;
    -webkit-flex-direction: column;
    flex-direction: column;
    float: left;
  }
  .small-image-button1:hover .image-overlay {
    width: 100%;
    height: 8px;
    position: absolute;
    top: 0px;
    left: 0px;
    background-color: #0ca8fd;
    opacity: 0.9;
  }

  .BrainhubCarousel__container {
    position: fixed;
    bottom: 0px;
    left: 0px;
    /* background-color: rgba(0, 0, 0, 0.6); */
    padding: 0.6rem 0.2rem;
    z-index: 2;
    background: rgb(0, 0, 0);
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 0.4713235636051295) 100%
    );
  }

  .left-title {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 15px;
    transform: translate(-50%, -50%);
    color: white;
    text-transform: uppercase;
  }
  .open-carousel {
    border: none;
    border-radius: 0px;
    padding: 0.3rem;
    z-index: 1;
    cursor: pointer;
    position: fixed;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 15px;
    font-weight: bold;
    opacity: 1;
    cursor: pointer;
    /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#000000+0,000000+100&0.02+1,0.16+100 */
    background: -moz-linear-gradient(
      top,
      rgba(0, 0, 0, 0.02) 0%,
      rgba(0, 0, 0, 0.02) 1%,
      rgba(0, 0, 0, 0.16) 100%
    ); /* FF3.6-15 */
    background: -webkit-linear-gradient(
      top,
      rgba(0, 0, 0, 0.02) 0%,
      rgba(0, 0, 0, 0.02) 1%,
      rgba(0, 0, 0, 0.16) 100%
    ); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.02) 0%,
      rgba(0, 0, 0, 0.02) 1%,
      rgba(0, 0, 0, 0.16) 100%
    ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#05000000', endColorstr='#29000000',GradientType=0 ); /* IE6-9 */
  }
  .close-carousel {
    border: none;
    border-radius: 0px;
    padding: 0.3rem;
    z-index: 1;
    cursor: pointer;
    position: fixed;
    bottom: 114px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 15px;
    font-weight: bold;
    opacity: 1;
    /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#000000+0,000000+100&0.07+1,0.16+100 */
    background: -moz-linear-gradient(
      top,
      rgba(0, 0, 0, 0.07) 0%,
      rgba(0, 0, 0, 0.07) 1%,
      rgba(0, 0, 0, 0.16) 100%
    ); /* FF3.6-15 */
    background: -webkit-linear-gradient(
      top,
      rgba(0, 0, 0, 0.07) 0%,
      rgba(0, 0, 0, 0.07) 1%,
      rgba(0, 0, 0, 0.16) 100%
    ); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.07) 0%,
      rgba(0, 0, 0, 0.07) 1%,
      rgba(0, 0, 0, 0.16) 100%
    ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#12000000', endColorstr='#29000000',GradientType=0 ); /* IE6-9 */
  }
`;
