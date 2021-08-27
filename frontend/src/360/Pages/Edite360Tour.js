import React, { useState, useEffect } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import { UserContext } from "../context/user";
import Frame from "../Pages/FrameAddTour";
import styled from "styled-components";
import axios from "axios";
import { media } from "../styled";
import ContentLoader, { Facebook } from "react-content-loader";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import img2 from "../../assets/tourImage/close.png";
import img6 from "../../assets/tourImage/23627.png";
import Rotate from "../Assets/rotate.png";
import RotatNo from "../Assets/rotateNo.png";
import { FaLayerGroup, FaPlayCircle } from "react-icons/fa";
import { RiRotateLockLine, RiRestartLine } from "react-icons/ri";
import { FiImage, FiChevronDown, FiChevronUp } from "react-icons/fi";
import Carousel, { Dots, slidesToShowPlugin } from "@brainhubeu/react-carousel";
import IconButton from "@material-ui/core/IconButton";
// import DeleteIcon from '@material-ui/icons/Delete';
import "@brainhubeu/react-carousel/lib/style.css";
import moment from "moment";
import SweetAlert from "react-bootstrap-sweetalert";
import Loading from "../Pages/Loading";

import {
  PushSpinner,
  BallSpinner,
  CubeSpinner,
  ClapSpinner,
  DominoSpinner,
  FillSpinner,
} from "react-spinners-kit"; //spiners
// slider
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import PlayButton1 from "../Assets/playicon/play (1).png";
import PlayButton2 from "../Assets/playicon/play (2).png";
import Line1 from "../Assets/line.png";
import Line2 from "../Assets/line2.png";
//
import {
  Col,
  Button,
  FormGroup,
  Input,
  Row,
  Label,
  Container,
  Card,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Formik, Field, Form } from "formik";
// accordion
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Checkbox from "../../components/@vuexy/checkbox/CheckboxesVuexy";

import {
  File,
  XCircle,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ArrowLeft,
  Info,
  MoreVertical,
  ChevronsRight,
  Disc,
  CheckCircle,
  Lock,
  Type,
  Send,
  Home,
  Settings,
  Layers,
  UploadCloud,
  RotateCw,
  Eye,
  RefreshCcw,
  BookOpen,
  PlayCircle,
  Image,
  FileText,
  Underline,
  RotateCcw,
  Edit,
} from "react-feather";
import { gridLayer } from "leaflet";

// slider

function valuetext(value) {
  return `${value}°C`;
}

// slider

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

export default function Edite360Tour() {
  const classes = useStyles();
  const history = useHistory();
  const { user } = React.useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { prooduct } = location.state;

  const format2 = "YYYY-MM-DD HH:mm:ss";
  var date2 = new Date();
  const dateTime2 = moment(date2).format(format2);
  console.log(dateTime2);

  const [lastEdit, setlastEdit] = useState(dateTime2);

  const [expanded, setExpanded] = React.useState(false);
  const [image, setImage] = useState([]); // this we be added with getplaces/ the image we added with addThreeSixty form
  const [imageURL, setImageURL] = useState([]);
  const [id, setId] = useState(prooduct.id);
  const [title, settitle] = useState("");
  const [description, setDescription] = useState("");
  const [havePassword, sethavePassword] = useState();
  const [publish, setPublish] = useState();
  const [passwordo, setpasswordo] = useState("");
  const [rotation, setRotation] = useState();
  const [rotatioTest, setRotatioTest] = useState();
  const [rotationSpeed, setrotationSpeed] = useState("");
  const [openDescription, setOpenDescription] = useState();
  const [openDescriptionEdit, setOpenDescriptionEdit] = useState();
  const [loop, setLoop] = useState();
  const [direction, setDirection] = useState("");
  const [zoom, setZoom] = useState("");
  const [pause, setPause] = useState();
  const [pauseTest, setPauseTest] = useState();
  const [showImageFeaturedInPause, setShowImageFeaturedInPause] = useState();
  const [playicon, setplayicon] = useState("");
  const [disTourTitle, setDisTourTitle] = useState();
  const [cssTourTitle, setCssTourTitle] = useState("");
  const [pauseOpacity, setPauseOpacity] = useState("");
  // const [submitTime, setSubmitTime] = useState(dateTime1);
  const [EnableLine, setEnableLine] = useState();
  const [LineTitle, setLineTitle] = useState("");
  const [openCarousel, setopenCarousel] = useState();
  const [openCarouselTest, setopenCarouselTest] = useState(false);
  const [carouselDesing, setCarouselDesing] = useState("");
  const [nadir, setnadir] = useState(true);
  const [nadirImage, setnadirImage] = useState(
    "/static/media/Best-15.fae96415.jpg"
  );
  const [spinnerColor, setspinnerColor] = useState("#008000"); // spinner color
  const [spinnerSize, setSpinnerSize] = useState("100");
  const [preloaderIcon, setpreloaderIcon] = useState(
    <FillSpinner color={spinnerColor} size={spinnerSize} />
  );
  const [css, setCss] = useState(true);
  const [css1, setCss1] = useState(true);
  // const [style1, setStyle1] = useState("small-image-button1");

  const [activeImageCarousel, setActiveImageCarousel] = useState(false);
  const [displayTitleBesideThumb, setDisplayTitleBesideThumb] = useState(true);

  const [nadirScale, setnadirScale] = useState(".5 .5 .5 ");
  const [nadirOpacity, setnadirOpacity] = useState("0.5");
  const [view, setView] = useState("70 0 0");
  const [showCompanyTitle, setShowCompanyTitle] = useState(true);
  const [compnyTitle, setCompnyTitle] = useState("WALKIN");
  const [showCompanyTitleWithUrl, setshowCompanyTitleWithUrl] = useState(false);
  const [companyUrl, setcompanyUrl] = useState("https://walkin-360.com/");
  const [featuredImage, setfeaturedImage] = useState();
  const [userPassword, setUserPassword] = useState("");
  const [showpasswordDesign, setShowpasswordDesign] = useState();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // slider change function rotatio speed

  const handleChangeSlider = (event, newValue) => {
    setrotationSpeed(newValue);
  };
  //  end slider change function rotatio speed

  // opacity of start up on pause
  const handleOpacityStart = (event, newValue) => {
    setPauseOpacity(newValue);
  };
  // end opacity of start up on pause

  // change zoom

  const handleChangeZoom = (event, newValue) => {
    setZoom(newValue);
  };
  // end zoom

  // rotatio direction
  const handelDirection = (event) => {
    setDirection(event.target.value);
  };
  // end rotatio direction

  // tour title

  const handelTourTitle = (event) => {
    setCssTourTitle(event.target.value);
  };
  //end tour title

  //  line title
  const handelLineTitle = (event) => {
    setLineTitle(event.target.value);
  };
  //end  line title

  // change play icon
  const handelPlayIcon = (event) => {
    setplayicon(event.target.value);
  };
  // end change play icon

  //  open close description
  const HandelInfo = () => {
    setOpenDescription(!openDescription);
  };
  const HandelInfoEdit = () => {
    setOpenDescriptionEdit(!openDescriptionEdit);
  };

  const HandelStartUp = () => {
    setPauseTest(!pauseTest);
  };

  const close = () => {
    setOpenDescriptionEdit(!openDescriptionEdit);
  };

  const HnadelPasswordWindow = () => {
    setShowpasswordDesign(!showpasswordDesign);
  };
  // change carousel design
  const handelCarouselDesign = (event) => {
    setCarouselDesing(event.target.value);
  };

  const HandelOpenCarouselTest = () => {
    setopenCarouselTest(!openCarouselTest);
  };
  // end change carousel design

  // End open close description

  // loader style
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

  React.useEffect(() => {
    getPlaces();
  }, []);

  const getPlaces = () => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/places/${id}`)
      .then((res) => {
        console.log(res.data.place);
        console.log(JSON.parse(res.data.place.image).uploadInfo.url);
        setPause(res.data.place.pause);
        setPauseTest(res.data.place.pause);
        setImage(JSON.parse(res.data.place.imgsData[0]));
        setImageURL(JSON.parse(res.data.place.imgsData[0])[0]);
        settitle(res.data.place.title);
        setDescription(res.data.place.description);
        sethavePassword(res.data.place.havePassword);
        setPublish(res.data.place.publish);
        setpasswordo(res.data.place.passwordo);
        setRotation(res.data.place.rotation);
        setRotatioTest(res.data.place.rotation);
        setrotationSpeed(res.data.place.rotationSpeed);
        setOpenDescription(res.data.place.openDescription);
        setLoop(res.data.place.loop);
        setDirection(res.data.place.direction);
        setZoom(res.data.place.zoom);
        setopenCarousel(res.data.place.openCarousel);
        // setopenCarouselTest(res.data.place.openCarousel);
        setCarouselDesing(res.data.place.carouselDesing);
        setfeaturedImage(JSON.parse(res.data.place.image).uploadInfo.url);
        setShowImageFeaturedInPause(res.data.place.showImageFeaturedInPause);
        setplayicon(res.data.place.playicon);
        setDisTourTitle(res.data.place.disTourTitle);
        setPauseOpacity(res.data.place.pauseOpacity);
        setCssTourTitle(res.data.place.cssTourTitle);
        setEnableLine(res.data.place.EnableLine);
        setLineTitle(res.data.place.LineTitle);
        // setlastEdit(res.data.place.lastEdit);
        console.log(res.data.place.lastEdit);
        // setSubmitTime(res.data.place.time);
        setInterval(() => {
          setLoading(false);
        }, 0);
      })
      .catch((error) => {
        history.push("/");
      });
  };

  const handelSubmit1 = () => {
    let form = new FormData();
    form.append("title", title);
    form.append("description", description);
    form.append("havePassword", havePassword);
    form.append("publish", publish);
    form.append("passwordo", passwordo);
    form.append("rotation", rotation);
    form.append("lastEdit", lastEdit);
    form.append("rotationSpeed", rotationSpeed);
    form.append("openDescription", openDescription);
    form.append("loop", loop);
    form.append("direction", direction);
    form.append("zoom", zoom);
    form.append("pause", pause);
    form.append("showImageFeaturedInPause", showImageFeaturedInPause);
    form.append("playicon", playicon);
    form.append("disTourTitle", disTourTitle);
    form.append("pauseOpacity", pauseOpacity);
    form.append("cssTourTitle", cssTourTitle);
    form.append("EnableLine", EnableLine);
    form.append("LineTitle", LineTitle);
    // form.append("time", dateTime1);
    //form.append("openCarousel", openCarousel);
    form.append("carouselDesing", carouselDesing);
    form.append("imgsData", JSON.stringify(image));

    console.log();

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    axios
      .patch(`http://localhost:5000/api/places/${id}`, form, config)
      .then((res) => {
        console.log(res);
        window.location.reload(true);
      })
      .catch((error) => console.log(error));
  };

  const resetAll = () => {
    console.log("button clicked");

    axios
      .patch(`http://localhost:5000/api/places/${id}`, {
        title: title,
        description: description,
        havePassword: false,
        passwordo: "",
        publish: true,
        rotation: true,
        rotationSpeed: "70000",
        openDescription: false,
        loop: true,
        direction: "normal",
        zoom: "0.6",
        pause: false,
        showImageFeaturedInPause: false,
        playicon: "http://localhost:3000/static/media/play-button.ee47c8c5.png",
        disTourTitle: false,
        pauseOpacity: "0.3",
        cssTourTitle: "tourShadow",
        openCarousel: false,
      })
      .then((res) => {
        console.log(res);
        window.location.reload(true);
      })
      .catch((error) => console.log(error));
  };
  const PasswordCheck = (password, userpassword, css) => {
    console.log(userpassword);
    if (password == userpassword) {
      console.log("password correct");
      // setCss(false);
      // setCss1(false);
      HnadelPasswordWindow();
    } else console.log("password false");
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <WholePage>
      <div className="whole-page">
        <div className="ImageTour">
          <>
            <div className="all-page">
              <div>
                <div>
                  {openDescriptionEdit && (
                    // if the information background is open, what to show, here we talk about title of tour and description of tour
                    <div>
                      <Title>
                        <div className="containers">
                          <XCircle
                            className="close1"
                            onClick={close}
                            color="#0ca8fd"
                          />
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "1fr 1fr 1fr",
                            }}
                          >
                            <div />
                            <img
                              src={imageURL.url}
                              alt=""
                              style={{
                                width: "80px",
                                height: "80px",
                                borderRadius: "60px",
                                justifySelf: "center",
                                border: "1px solid #e6e6e6",
                              }}
                            />
                            <div />
                          </div>
                          <div className="title"> {title}</div>
                          <hr />
                          <div className="descrition">{description}</div>
                        </div>
                      </Title>
                    </div>
                  )}
                </div>

                {!pauseTest && ( // if we are on pause, mean we have pasue start screen. if we are not on pause screen then to show home and dinfromation buttons
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

                        <IconButton
                          aria-label="delete"
                          style={{
                            outline: "none",
                            backgroundColor: "rgba(255,0,0,0.0)",
                          }}
                        >
                          <Info
                            onClick={HandelInfoEdit}
                            size={25}
                            style={{
                              color: "white",
                              backgroundColor: "rgba(255,0,0,0.0)",
                            }}
                          />
                        </IconButton>
                      </div>
                      <div className="title-tour">
                        <h5>{title}</h5>
                      </div>
                      <div className="top-bar">
                        <div className={classes.exitbtn}>
                          <>
                            {!pause && rotatioTest ? (
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
                                    return setRotatioTest(false);
                                  }}
                                  size={25}
                                  style={{
                                    color: "white",
                                    backgroundColor: "rgba(255,0,0,0.0)",
                                    width: "27px",
                                    height: "25px",
                                    position: "fixed",
                                    top: "70px",
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
                                    return setRotatioTest(true);
                                  }}
                                  size={25}
                                  style={{
                                    color: "white",
                                    backgroundColor: "rgba(255,0,0,0.0)",
                                    width: "27px",
                                    height: "25px",
                                    position: "fixed",
                                    top: "70px",
                                    right: "20px",
                                  }}
                                />
                              </IconButton>
                            )}
                          </>
                        </div>
                      </div>
                    </div>
                  </Btn>
                )}

                <Tour>
                  {/* // if we define to have rotation the 360 , then what will show, we will go for checking the nadir , if we have nadir or not. */}
                  {!loading && nadir && rotatioTest ? (
                    <Frame
                      image={imageURL.url}
                      animation={`property: rotation; from:0 0 0; to: 0 360 0; dir:${direction}; loop: ${loop}; dur: ${rotationSpeed};`}
                      zoom={zoom}
                      nadir={nadirImage}
                      nadirScale={nadirScale}
                      nadirOpacity={nadirOpacity}
                      view={view}
                      onClick={() => console.log("elias")}
                    />
                  ) : (
                    <Frame image={imageURL.url} zoom={zoom} />
                  )}

                  {/* {!pause && showCompanyTitleWithUrl && showCompanyTitle ? (
                    <div className="company-title">
                      <p>
                        <a href={companyUrl}>{compnyTitle}</a>
                      </p>
                    </div>
                  ) : (
                    ""
                  )} */}

                  {pauseTest ? ( // here we checking if we are in pasue , if yes , then we will go for other check, if we will show featured image in the pause screen, if not to show him image that we will define, background, black screen, we need to dfine those
                    <>
                      <div
                        style={{
                          width: "65%",
                          height: "100%",
                          position: "fixed",
                          right: "0px",
                          top: "52px",
                          zIndex: "3",
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

                            width: "100%",
                            height: "100vh",
                            position: "fixed",
                            right: "0px",
                            top: "0px",
                            zIndex: "3",
                            opacity: pauseOpacity,
                          }}
                        ></div>
                        <div
                          onClick={() => {
                            return setPauseTest(false);
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
                          {EnableLine ? (
                            <img className="Line" src={Line1}></img>
                          ) : (
                            ""
                          )}
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
                    {!pauseTest && openCarouselTest ? ( // here we define if the carousel is start with open or close status
                      <div>
                        <Carousel
                          slidesPerPage={3}
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
                                        {preloaderIcon}
                                      </div>
                                    ) : (
                                      <div
                                        // url image
                                        style={{ cursor: "pointer" }}
                                        className={carouselDesing}
                                        onDoubleClick={() => {
                                          setLoading(true);
                                          // setActiveImageCarousel(true);
                                          setImageURL(p);
                                          setInterval(() => {
                                            setLoading(false);
                                          }, 500);
                                        }}
                                      >
                                        <div
                                          className={`picture-image ${
                                            p.thumbnail_url ==
                                            imageURL.thumbnail_url
                                              ? "activeImage"
                                              : "notActiveImage"
                                          }`}
                                        >
                                          {p.thumbnail_url !==
                                            imageURL.thumbnail_url && (
                                            <div
                                              style={{
                                                width: "100%",
                                                height: "100%",
                                                top: "0px",
                                                left: "0px",
                                                position: "absolute",
                                                backgroundColor: "black",
                                                opacity: "0.4",
                                              }}
                                            ></div>
                                          )}
                                          {p.thumbnail_url ==
                                            imageURL.thumbnail_url && (
                                            <div
                                              style={{
                                                width: "100%",
                                                height: "100%",
                                                top: "0px",
                                                left: "0px",
                                                position: "absolute",
                                                backgroundColor: "black",
                                                opacity: "0.8",
                                              }}
                                            ></div>
                                          )}
                                          {p.thumbnail_url ==
                                            imageURL.thumbnail_url && (
                                            <Settings
                                              size={20}
                                              className="visited"
                                              style={{
                                                color: "white",
                                                position: "absolute",
                                                left: "10px",
                                                top: "10px",
                                                color: "#0ca8fd",
                                              }}
                                            ></Settings>
                                          )}
                                          <img
                                            //thumb
                                            src={p.thumbnail_url}
                                            className="picture-image"
                                            width="200"
                                          />{" "}
                                          {p.thumbnail_url !==
                                            imageURL.thumbnail_url && (
                                            <Settings
                                              size={40}
                                              className="onhoverplay"
                                            />
                                          )}
                                          {/* <div className="image-overlay" /> */}
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
                            return setopenCarouselTest(false);
                          }}
                        >
                          <ChevronDown size={35} color="white" />
                        </div>
                      </div>
                    ) : (
                      <div
                        className="open-carousel"
                        onClick={() => {
                          return setopenCarouselTest(true);
                        }}
                      >
                        <ChevronUp size={35} color="white" />
                      </div>
                    )}
                  </div>
                </Circle1>
                <LockPage>
                  {showpasswordDesign ? (
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
                            src={featuredImage}
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
            </div>
          </>
        </div>

        <div className="Settings">
          <div className={classes.root}>
            {/* title */}

            <Accordion
              square
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <div className="bread">
                <Layers
                  className="align-top"
                  size={25}
                  color="#0ca8fd"
                  style={{ margin: "4px", cursor: "pointer" }}
                  onClick={() => {
                    history.push("/VirtualTour");
                  }}
                />
                <div style={{ display: "inline-block", marginTop: "5px" }}>
                  <ChevronRight
                    className="align-top"
                    size={15}
                    style={{ margin: "4px" }}
                  />
                  <span
                    style={{
                      position: "relative",
                      textTransform: "uppercase",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    {title}
                  </span>
                  <button
                    style={{
                      position: "absolute",
                      right: "2rem",
                      cursor: "pointer",
                      color: "#0ca8fd",
                      border: "none",
                      backgroundColor: "rgba(0, 0, 0, 0)",
                      outline: "none",
                      borderLeft: "1px solid black",
                      paddingLeft: "15px",
                    }}
                    onClick={() => window.open(`/places/${id}`, "_blank")}
                  >
                    <Eye className="align-top" size={23} />
                  </button>
                  <button
                    style={{
                      position: "absolute",

                      cursor: "pointer",
                      color: "#0ca8fd",
                      border: "none",
                      backgroundColor: "rgba(0, 0, 0, 0)",
                      outline: "none",

                      paddingRight: "15px",
                      position: "absolute",
                      right: "5.5rem",
                      cursor: "pointer",
                      color: "#0ca8fd",
                      paddingLeft: "15px",
                      borderLeft: "1px solid black",
                    }}
                  >
                    <RotateCw
                      className="align-top"
                      size={23}
                      onClick={resetAll}
                    />
                  </button>

                  <button
                    style={{
                      position: "absolute",

                      cursor: "pointer",
                      color: "#0ca8fd",
                      border: "none",
                      backgroundColor: "rgba(0, 0, 0, 0)",
                      outline: "none",

                      paddingRight: "15px",
                      paddingLeft: "15px",

                      position: "absolute",
                      right: "9.5rem",
                      cursor: "pointer",
                      color: "#0ca8fd",
                    }}
                  >
                    <Edit
                      className="align-top"
                      size={23}
                      onClick={() => {
                        history.push(`/EditPictures/${id}`, {
                          product: {
                            id,
                          },
                        });
                      }}
                    />
                  </button>
                </div>
              </div>
              <AccordionSummary
                expandIcon={<ChevronDown style={{ color: "#0ca8fd" }} />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography className={classes.heading}>Tour Tilte</Typography>
                <Typography className={classes.secondaryHeading}>
                  Change Tour Title
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {/* <Col>
                  <FormGroup className="has-icon-left form-label-group position-relative">
                    <Input
                      name="title"
                      id="nameFloatingIcons"
                      placeholder="360 tour title"
                      value={title}
                      onChange={(e) => settitle(e.target.value)}
                      // value={formikProps.values.title}
                      // onChange={formikProps.handleChange("title")}
                      // onBlur={formikProps.handleBlur("title")}
                      className="form-control"
                      style={{ border: "1px solid black" }}
                    />
                    <div className="form-control-position">
                      <Type size={20} style={{ color: "#0ca8fd" }} />
                    </div>

                    <Label for="title">Title</Label>
                  </FormGroup>
                </Col> */}
              </AccordionDetails>
            </Accordion>
            {/* description */}
            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <AccordionSummary
                expandIcon={<ChevronDown style={{ color: "#0ca8fd" }} />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
              >
                <Typography className={classes.heading}>
                  Tour Title and Description
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  Change Tour Title and Description
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Container>
                  <Row className="mb-2">
                    <Col>
                      <FormGroup className="has-icon-left form-label-group position-relative">
                        <Input
                          name="title"
                          id="nameFloatingIcons"
                          placeholder="360 tour title"
                          value={title}
                          onChange={(e) => settitle(e.target.value)}
                          // value={formikProps.values.title}
                          // onChange={formikProps.handleChange("title")}
                          // onBlur={formikProps.handleBlur("title")}
                          className="form-control"
                          style={{ border: "1px solid black" }}
                        />
                        <div className="form-control-position">
                          <Type size={20} style={{ color: "#0ca8fd" }} />
                        </div>

                        <Label for="title">Tour Title</Label>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup className="has-icon-left form-label-group position-relative">
                        <Input
                          name="title"
                          type="textarea"
                          rows="3"
                          id="nameFloatingIcons"
                          placeholder="360 tour title"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          // value={formikProps.values.title}
                          // onChange={formikProps.handleChange("title")}
                          // onBlur={formikProps.handleBlur("title")}
                          className="form-control"
                          style={{ border: "1px solid black" }}
                        />
                        <div className="form-control-position">
                          <Type size={20} style={{ color: "#0ca8fd" }} />
                        </div>

                        <Label for="title">Tour Description</Label>
                      </FormGroup>
                    </Col>
                  </Row>

                  <hr />
                  <Row style={{ display: "inline-block" }}>
                    <Col>
                      <FormGroup>
                        <Label for="customFile" className="mb-1">
                          1- Start description opened
                        </Label>
                        <Checkbox
                          color="primary"
                          type="checkbox"
                          checked={openDescription}
                          // onChange={check}
                          onChange={(event) =>
                            setOpenDescription(event.target.checked)
                          }
                          icon={<BookOpen className="vx-icon" size={16} />}
                          label="Start description opened"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label for="customFile" className="mb-1">
                          2- Design and settings
                        </Label>
                        <Checkbox
                          color="primary"
                          type="checkbox"
                          checked={openDescriptionEdit}
                          // onChange={check}
                          onChange={(event) =>
                            setOpenDescriptionEdit(event.target.checked)
                          }
                          icon={<BookOpen className="vx-icon" size={16} />}
                          label="Show me the description cards and settings "
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Container>
              </AccordionDetails>
            </Accordion>
            {/* password */}
            <Accordion
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
            >
              <AccordionSummary
                expandIcon={<ChevronDown style={{ color: "#0ca8fd" }} />}
                aria-controls="panel3bh-content"
                id="panel3bh-header"
              >
                <Typography className={classes.heading}>
                  Tour Password
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  Protect your Tour with password
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Container>
                  <Row style={{ display: "inline-block" }}>
                    <Col>
                      <FormGroup>
                        <Label for="customFile" className="mb-1">
                          1- Enable password for the virtual tour
                        </Label>
                        <Checkbox
                          color="primary"
                          type="checkbox"
                          checked={havePassword}
                          onChange={(event) =>
                            sethavePassword(event.target.checked)
                          }
                          icon={<Lock className="vx-icon" size={16} />}
                          label="Password"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  {havePassword ? (
                    <>
                      <Row>
                        <Col className="mt-1">
                          <FormGroup className="has-icon-left form-label-group position-relative">
                            <Input
                              name="title"
                              id="nameFloatingIcons"
                              placeholder="360 tour title"
                              value={passwordo}
                              onChange={(e) => setpasswordo(e.target.value)}
                              // value={formikProps.values.title}
                              // onChange={formikProps.handleChange("title")}
                              // onBlur={formikProps.handleBlur("title")}
                              className="form-control"
                              style={{ border: "1px solid black" }}
                            />
                            <div className="form-control-position">
                              <Lock size={20} style={{ color: "#0ca8fd" }} />
                            </div>

                            <Label for="title">Password</Label>
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row style={{ display: "inline-block" }}>
                        <Col>
                          <FormGroup>
                            <Label for="customFile" className="mb-1">
                              2- Design and settings
                            </Label>
                            <Checkbox
                              color="primary"
                              type="checkbox"
                              checked={showpasswordDesign}
                              onChange={(event) =>
                                setShowpasswordDesign(event.target.checked)
                              }
                              icon={<Lock className="vx-icon" size={16} />}
                              label="Show me Password card"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </>
                  ) : (
                    ""
                  )}
                </Container>
              </AccordionDetails>
            </Accordion>
            {/* publish */}
            <Accordion
              expanded={expanded === "panel4"}
              onChange={handleChange("panel4")}
            >
              <AccordionSummary
                expandIcon={<ChevronDown style={{ color: "#0ca8fd" }} />}
                aria-controls="panel4bh-content"
                id="panel4bh-header"
              >
                <Typography className={classes.heading}>
                  Tour Publish
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  Make my tour publish for extrnal use
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormGroup>
                  <Label for="customFile" className="mb-1">
                    Make my tour publish for extrnal use
                  </Label>
                  <Checkbox
                    color="primary"
                    type="checkbox"
                    checked={publish}
                    onChange={(event) => setPublish(event.target.checked)}
                    icon={<UploadCloud className="vx-icon" size={16} />}
                    label="Publish"
                  />
                </FormGroup>
              </AccordionDetails>
            </Accordion>
            {/* tour rotation */}
            <Accordion
              expanded={expanded === "panel5"}
              onChange={handleChange("panel5")}
            >
              <AccordionSummary
                expandIcon={<ChevronDown style={{ color: "#0ca8fd" }} />}
                aria-controls="panel4bh-content"
                id="panel4bh-header"
              >
                <Typography className={classes.heading}>
                  Tour auto rotation
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  Enable or disable autorotation
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Container>
                  <Row style={{ display: "inline-block" }}>
                    <Col>
                      <FormGroup>
                        <Checkbox
                          color="primary"
                          type="checkbox"
                          checked={rotation}
                          onChange={(event) => {
                            return (
                              setRotation(event.target.checked),
                              setRotatioTest(event.target.checked)
                            );
                          }}
                          icon={<RotateCw className="vx-icon" size={16} />}
                          label="Enable autorotation"
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  {rotation ? (
                    <>
                      <Row>
                        <Col>
                          <div className={classes.root1}>
                            <Slider
                              className="mt-2"
                              style={{ color: "#0ca8fd", height: "5px" }}
                              track="false"
                              color="secondary"
                              defaultValue={30}
                              getAriaValueText={valuetext}
                              aria-labelledby="discrete-slider"
                              valueLabelDisplay="auto"
                              step={10000}
                              marks
                              min={500}
                              max={70000}
                              valueLabelDisplay="on"
                              value={rotationSpeed}
                              onChange={handleChangeSlider}
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                            <Typography id="continuous-slider" gutterBottom>
                              2- Enable loop for your Tour rotation
                            </Typography>
                            <Checkbox
                              color="primary"
                              type="checkbox"
                              checked={loop}
                              onChange={(event) =>
                                setLoop(event.target.checked)
                              }
                              icon={<RotateCw className="vx-icon" size={16} />}
                              label="Enable Loop"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                            <FormControl className={classes.formControl}>
                              <InputLabel
                                id="demo-simple-select-label"
                                style={{ color: "black" }}
                              >
                                Rotation direction
                              </InputLabel>
                              <Select
                                className={classes.select}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={direction}
                                onChange={handelDirection}
                              >
                                <MenuItem value="normal">Normal</MenuItem>
                                <MenuItem value={"reverse"}>Reverse</MenuItem>
                                {/* <MenuItem value="alternate">Alternate</MenuItem> */}
                              </Select>
                            </FormControl>
                          </FormGroup>
                        </Col>
                      </Row>
                    </>
                  ) : (
                    ""
                  )}
                </Container>
              </AccordionDetails>
            </Accordion>
            {/* tour zoom */}
            <Accordion
              expanded={expanded === "panel6"}
              onChange={handleChange("panel6")}
            >
              <AccordionSummary
                expandIcon={<ChevronDown style={{ color: "#0ca8fd" }} />}
                aria-controls="panel4bh-content"
                id="panel4bh-header"
              >
                <Typography className={classes.heading}>Tour zoom</Typography>
                <Typography className={classes.secondaryHeading}>
                  Change the zoom of the Tour
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Container>
                  <Row>
                    <Col>
                      <div className={classes.root1}>
                        <Label for="customFile" className="mb-3 mt-1">
                          1- Change tour zoom
                        </Label>
                        <Slider
                          className=" mt-2"
                          style={{ color: "#0ca8fd", height: "5px" }}
                          track="false"
                          color="secondary"
                          defaultValue={1}
                          getAriaValueText={valuetext}
                          aria-labelledby="discrete-slider"
                          valueLabelDisplay="auto"
                          step={0.1}
                          valueLabelDisplay="on"
                          marks
                          min={0}
                          max={2}
                          value={zoom}
                          onChange={handleChangeZoom}
                        />
                      </div>
                    </Col>
                  </Row>
                </Container>
              </AccordionDetails>
            </Accordion>
            {/* start tour with pause and other settings */}
            <Accordion
              expanded={expanded === "panel7"}
              onChange={handleChange("panel7")}
            >
              <AccordionSummary
                expandIcon={
                  <ChevronDown style={{ color: "#0ca8fd" }} size={25} />
                }
                aria-controls="panel4bh-content"
                id="panel4bh-header"
              >
                <Typography className={classes.heading}>Tour start</Typography>
                <Typography className={classes.secondaryHeading}>
                  Settings for the tour start up
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Container>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label for="customFile" className="mb-1">
                          1- Enable start up with Play button
                        </Label>
                        <Checkbox
                          color="primary"
                          type="checkbox"
                          checked={pause}
                          // onChange={(event) => setPause(event.target.checked)}
                          onChange={(event) => {
                            return (
                              setPause(event.target.checked),
                              setPauseTest(event.target.checked)
                            );
                          }}
                          icon={<PlayCircle className="vx-icon" size={16} />}
                          label="Enable Play button on start up"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  {pause ? (
                    <>
                      <Row>
                        <Col>
                          <FormGroup>
                            <Label for="customFile" className="mb-1">
                              2- Design and settings
                            </Label>
                            <Checkbox
                              color="primary"
                              type="checkbox"
                              checked={pauseTest}
                              onChange={(event) =>
                                setPauseTest(event.target.checked)
                              }
                              icon={
                                <PlayCircle className="vx-icon" size={16} />
                              }
                              label="Show me the design and setting for start up"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      {pauseTest ? (
                        <>
                          {" "}
                          <Row>
                            <Col>
                              <div className={classes.opacitySlider}>
                                <Label for="customFile" className="mb-2 mt-2">
                                  3- Change overLay opacity
                                </Label>
                                <Slider
                                  className=" mt-2"
                                  style={{ color: "#0ca8fd", height: "5px" }}
                                  track="normal"
                                  color="secondary"
                                  // defaultValue={pauseOpacity}
                                  getAriaValueText={valuetext}
                                  aria-labelledby="discrete-slider"
                                  valueLabelDisplay="auto"
                                  step={0.1}
                                  marks
                                  min={0}
                                  max={1}
                                  valueLabelDisplay="on"
                                  value={pauseOpacity}
                                  onChange={handleOpacityStart}
                                />
                              </div>
                            </Col>
                          </Row>
                          <Row className="mt-2">
                            <Col>
                              <FormGroup>
                                <FormControl className={classes.formControl2}>
                                  {/* <InputLabel
                                id="demo-simple-select-label"
                                style={{ color: "black" }}
                              >
                                start button design
                              </InputLabel> */}
                                  <Label for="customFile" className="mb-2 mt-2">
                                    4- start button design
                                  </Label>
                                  <Select
                                    className={classes.select}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={playicon}
                                    onChange={handelPlayIcon}
                                  >
                                    <MenuItem
                                      value={
                                        "http://localhost:3000/static/media/play-button.ee47c8c5.png"
                                      }
                                    >
                                      Design 1
                                    </MenuItem>
                                    <MenuItem value={PlayButton1}>
                                      Design 2
                                    </MenuItem>
                                    <MenuItem value={PlayButton2}>
                                      Design 3
                                    </MenuItem>
                                    {/* <MenuItem value="alternate">Alternate</MenuItem> */}
                                  </Select>
                                </FormControl>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <FormGroup>
                                <Label for="customFile" className="mb-2">
                                  5- Show Featured image in the start
                                </Label>
                                <Checkbox
                                  color="primary"
                                  type="checkbox"
                                  checked={showImageFeaturedInPause}
                                  onChange={(event) =>
                                    setShowImageFeaturedInPause(
                                      event.target.checked
                                    )
                                  }
                                  icon={<Image className="vx-icon" size={16} />}
                                  label="Show Featured image in the start"
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <FormGroup>
                                <Label for="customFile" className="mb-2">
                                  6 - Display Tour title on start up
                                </Label>
                                <Checkbox
                                  color="primary"
                                  type="checkbox"
                                  checked={disTourTitle}
                                  onChange={(event) =>
                                    setDisTourTitle(event.target.checked)
                                  }
                                  icon={<Type className="vx-icon" size={16} />}
                                  label="Display tour title"
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          {disTourTitle ? (
                            <>
                              <Row>
                                <Col>
                                  <FormGroup>
                                    <FormControl
                                      className={classes.formControl2}
                                    >
                                      <Label for="customFile" className="mb-1">
                                        7 - Title shoadow design
                                      </Label>

                                      <Select
                                        className={classes.select}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={cssTourTitle}
                                        onChange={handelTourTitle}
                                      >
                                        <MenuItem value={"tourShadow"}>
                                          Style1
                                        </MenuItem>
                                        <MenuItem value={"tour-title"}>
                                          Style2
                                        </MenuItem>
                                        {/* <MenuItem value="alternate">Alternate</MenuItem> */}
                                      </Select>
                                    </FormControl>
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <FormGroup>
                                    <Label for="customFile" className="mb-2">
                                      8 - Enable Underline Desing
                                    </Label>
                                    <Checkbox
                                      color="primary"
                                      type="checkbox"
                                      checked={EnableLine}
                                      onChange={(event) =>
                                        setEnableLine(event.target.checked)
                                      }
                                      icon={
                                        <Underline
                                          className="vx-icon"
                                          size={16}
                                        />
                                      }
                                      label="Display underline"
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                              {EnableLine ? (
                                <Row>
                                  <Col>
                                    <FormGroup>
                                      <FormControl
                                        className={classes.formControl2}
                                      >
                                        {/* <InputLabel
                                id="demo-simple-select-label"
                                style={{ color: "black" }}
                              >
                                start button design
                              </InputLabel> */}
                                        <Label
                                          for="customFile"
                                          className="mb-2 mt-2"
                                        >
                                          9 - Choose underline design
                                        </Label>
                                        <Select
                                          className={classes.select}
                                          labelId="demo-simple-select-label"
                                          id="demo-simple-select"
                                          value={LineTitle}
                                          onChange={handelLineTitle}
                                        >
                                          <MenuItem value={Line1}>
                                            Design 1
                                          </MenuItem>
                                          <MenuItem value={Line2}>
                                            Design 2
                                          </MenuItem>
                                          {/* <MenuItem value="alternate">Alternate</MenuItem> */}
                                        </Select>
                                      </FormControl>
                                    </FormGroup>
                                  </Col>
                                </Row>
                              ) : (
                                ""
                              )}
                            </>
                          ) : (
                            ""
                          )}
                        </>
                      ) : (
                        ""
                      )}
                    </>
                  ) : (
                    ""
                  )}
                </Container>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel8"}
              onChange={handleChange("panel8")}
            >
              <AccordionSummary
                expandIcon={<ChevronDown style={{ color: "#0ca8fd" }} />}
                aria-controls="panel4bh-content"
                id="panel4bh-header"
              >
                <Typography className={classes.heading}>
                  Carousel design
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  Change the design of your carousel
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Container>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label for="customFile" className="mb-1">
                          1- Start opend
                        </Label>
                        <Checkbox
                          color="primary"
                          type="checkbox"
                          checked={openCarousel}
                          // onChange={(event) => {
                          //   return setopenCarousel(event.target.checked);
                          // }}
                          onChange={(event) => {
                            return setopenCarousel(event.target.checked);
                          }}
                          icon={<ChevronDown className="vx-icon" size={16} />}
                          label="Start the tour with open carousel"
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <>
                    <Row>
                      <Col>
                        <FormGroup>
                          <Label for="customFile" className="mb-1">
                            2- Design and settings
                          </Label>
                          <Checkbox
                            color="primary"
                            type="checkbox"
                            checked={openCarouselTest}
                            onChange={(event) => {
                              return setopenCarouselTest(event.target.checked);
                            }}
                            icon={<ChevronDown className="vx-icon" size={16} />}
                            label="Show me carousel design and settings"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    {openCarouselTest ? (
                      <Row>
                        <Col>
                          <FormGroup>
                            <FormControl className={classes.formControl2}>
                              <Label for="customFile">3- Carousel Design</Label>
                              <Select
                                className={classes.select}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={carouselDesing}
                                onChange={handelCarouselDesign}
                              >
                                <MenuItem value={"small-image-button"}>
                                  Desingn 1
                                </MenuItem>
                                <MenuItem value={"small-image-button1"}>
                                  Desingn 2
                                </MenuItem>

                                {/* <MenuItem value="alternate">Alternate</MenuItem> */}
                              </Select>
                            </FormControl>
                          </FormGroup>
                        </Col>
                      </Row>
                    ) : (
                      ""
                    )}
                  </>
                </Container>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel9"}
              onChange={handleChange("panel9")}
            >
              <AccordionSummary
                expandIcon={<ChevronDown style={{ color: "#0ca8fd" }} />}
                aria-controls="panel4bh-content"
                id="panel4bh-header"
              >
                <Typography className={classes.heading}>
                  Personal data
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Nunc vitae orci ultricies, auctor nunc in, volutpat nisl.
                  Integer sit amet egestas eros, vitae egestas augue. Duis vel
                  est augue.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "pane20"}
              onChange={handleChange("pane20")}
            >
              <AccordionSummary
                expandIcon={<ChevronDown style={{ color: "#0ca8fd" }} />}
                aria-controls="panel4bh-content"
                id="panel4bh-header"
              >
                <Typography className={classes.heading}>
                  Personal data
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Nunc vitae orci ultricies, auctor nunc in, volutpat nisl.
                  Integer sit amet egestas eros, vitae egestas augue. Duis vel
                  est augue.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "pane21"}
              onChange={handleChange("pane21")}
            >
              <AccordionSummary
                expandIcon={<ChevronDown style={{ color: "#0ca8fd" }} />}
                aria-controls="panel4bh-content"
                id="panel4bh-header"
              >
                <Typography className={classes.heading}>
                  Personal data
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Nunc vitae orci ultricies, auctor nunc in, volutpat nisl.
                  Integer sit amet egestas eros, vitae egestas augue. Duis vel
                  est augue.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                padding: "40px 20px",
              }}
            >
              <div>
                <button
                  className="mr-1 mb-1 bg-gradient-primary"
                  color="none"
                  style={{
                    width: "90%",
                    border: "none",
                    backgroundColor: "#0ca8fd",
                    color: "white",
                    // position: "sticky",
                    bottom: "0px",
                    padding: "15px 10px",
                    // margin: "20px 0px",
                    zIndex: "4",
                    left: "1rem",
                    borderRadius: "5px",
                    outline: "none",
                  }}
                  onClick={handelSubmit1}
                  type="button"
                >
                  SUBMIT
                  {/* <Send size={15} style={{ marginLeft: "10px" }}></Send> */}
                </button>
              </div>
              <div>
                <button
                  className="mr-1 mb-1 bg-gradient-danger"
                  color="none"
                  style={{
                    width: "90%",
                    border: "none",
                    backgroundColor: "#0ca8fd",
                    color: "white",
                    // position: "sticky",
                    bottom: "0px",
                    padding: "15px 10px",
                    // margin: "20px 0px",
                    zIndex: "4",
                    left: "1rem",
                    borderRadius: "5px",
                    outline: "none",
                  }}
                  onClick={handelSubmit1}
                  type="button"
                >
                  Reset
                  {/* <RotateCw size={15} style={{ marginLeft: "10px" }}></RotateCw> */}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WholePage>
  );
}

const WholePage = styled.div`
  .MuiAccordionSummary-root {
    padding: 10px 30px;
  }
  .vx-checkbox-con .vx-checkbox {
    border-color: #0ca8fd;
  }
  .whole-page {
    display: grid;
  }
  .ImageTour {
    height: 100%;
  }
  .Settings {
    padding-top: 0rem;
    /* padding-left: 1.5rem;
    padding-right: 1.5rem; */
    padding-bottom: 4rem;
    position: fixed;
    overflow: scroll;
    top: 52px;
    left: 0px;
    height: 100%;
    background-color: #efefef;
    z-index: 5;
  }
  .bread {
    /* -webkit-box-shadow: 1px 12px 5px -7px rgba(0, 0, 0, 0.05);
    -moz-box-shadow: 1px 12px 5px -7px rgba(0, 0, 0, 0.05);
    box-shadow: 1px 12px 5px -7px rgba(0, 0, 0, 0.05); */
    position: relative;
    /* border-radius: 1rem; */
    left: 0px;
    top: 10px;
    z-index: 5;
    display: block;
    /* padding: 100px 0px; */
    display: block;
    height: auto;
    /* width: 350px; */
    background-color: #ffffff;
    padding: 1.5rem;
    margin-bottom: 1rem;
    /* border-bottom: 1px solid #d6dce1 !important; */
  }

  ${media.phone`
  .whole-page {
    display: grid;
    grid-template-columns: 1fr;
  }
  .Settings {
   width:100%;
}
  .bread {
width: 100%;
  
  }
  .ImageTour {
    width: 100%;

  }
  `}

  ${media.tablet`
  .whole-page {
    display: grid;
    grid-template-columns: 1fr;
  }
  .Settings {
   width: 100%;
}
  .bread {
width: 100%;
  
  }
  .ImageTour {
    width: 100%;

  }
  `}



  ${media.desktop`
  .whole-page {
    display: grid;
    grid-template-columns: 1fr;
  }
  .Settings {
   width: 45%;
}
  .bread {

  
  }
  .ImageTour {
    width:55%;

  }
  `}

  ${media.large`
  .whole-page {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .Settings {
   width: 35%;
}
  .bread {

  
  }
  .ImageTour {
    width: 65%;

  }
  `}
`;

const LockPage = styled.div`
  .black-back {
    position: fixed;
    width: 65%;
    right: 0px;
    height: 100%;
    background-color: black;
    z-index: 20;
    opacity: 0.95;
  }
  .black-back-none {
    display: none;
  }
  .lockPage-container {
    background-color: white;
    width: 40%;
    height: 40%;
    left: 50%;
    top: 50%;
    position: absolute;
    transform: translate(-10%, -50%);
    z-index: 20;
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
  /* .containers {
    position: fixed;
    padding: 3rem;
    right: 0px;
    top: 52px;
    width: 25%;
    height: 100vh;
    z-index: 20;
    background-color: white;
    border-radius: 25px;
    -webkit-box-shadow: -5px -3px 5px -4px rgba(0, 0, 0, 0.52);
    -moz-box-shadow: -5px -3px 5px -4px rgba(0, 0, 0, 0.52);
    box-shadow: -5px -3px 5px -4px rgba(0, 0, 0, 0.52);
  } */
  .containers {
    position: fixed;
    padding: 3rem;
    right: 0px;
    top: 52px;
    width: 25%;
    height: 100vh;
    z-index: 20;
    background-color: white;
    border-radius: 25px;
    -webkit-box-shadow: -5px -3px 5px -4px rgba(0, 0, 0, 0.52);
    -moz-box-shadow: -5px -3px 5px -4px rgba(0, 0, 0, 0.52);
    box-shadow: -5px -3px 5px -4px rgba(0, 0, 0, 0.52);
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
    right: 23%;
    top: 65px;
    max-width: 30px;
    max-height: 30px;
    display: block;
    cursor: pointer;
  }

  .title {
    color: #0ca8fd;
    font-size: 20px;
    text-align: center;
    padding: 1rem;
    white-space: nowrap;
    text-transform: uppercase;
  }

  .descrition {
    color: #787878;
    font-size: 13px;
    position: relative;
    padding: 1rem;
    text-align: center;
  }
`;
const Btn = styled.div`
  .container-top-left {
    position: absolute;
    left: 35.5%;
    top: 60px;
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

  .top-bar {
    position: fixed;
    right: 1rem;
    top: 65px;
    display: grid;
    grid-template-columns: auto auto auto;

    z-index: 1;
    justify-items: end;
  }

  .top-shadow {
    position: fixed;
    top: 52px;
    width: 100%;
    height: 50px;
    left: 35%;
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

  .addImg {
    border: none;
    border-radius: 0px;
    padding: 1rem;
    z-index: 11;
    cursor: pointer;
    background: green;
    font-size: 15px;
    font-weight: bold;
  }
  .sharebtn {
    border: none;
    border-radius: 0px;
    padding: 1rem;
    z-index: 11;
    cursor: pointer;
    background: green;
    font-size: 15px;
    font-weight: bold;
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

  .play-btn {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    z-index: 4;
    cursor: pointer;
  }
  .Line {
    position: absolute;
    left: 50%;
    top: 60%;
    transform: translate(-50%, -50%);
    width: 30%;

    z-index: 4;
  }

  .tour-title {
    position: absolute;
    left: 50%;
    top: 65%;
    transform: translate(-50%, -50%);
    color: White;
    z-index: 4;
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
    width: 65vw;
    height: 100vh;
    object-fit: cover;
    z-index: 4;
  }
`;

const Circle1 = styled.div`
  .image-overlay {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.3;
  }
  .activeImage {
    background-color: black;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    z-index: 111111111111111111111;
  }
  .notActiveImage {
    opacity: 1 !important;
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
    left: 35%;

    background-color: white;
    /* padding-top: 0.7rem; */
    padding: 1rem 0.3rem;
    z-index: 2;
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
    left: 67.5%;
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
    bottom: 117px;
    left: 67.5%;
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
  .onhoverplay {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: white;
    opacity: 0;
  }
  .BrainhubCarouselItem:hover .onhoverplay {
    opacity: 1;
    transition: opacity 0.4s;
  }
  .left-title {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 15px;
    transform: translate(-50%, -50%);
    color: white;
    text-transform: uppercase;
    opacity: 1;
  }
  .BrainhubCarouselItem:hover .left-title {
    opacity: 0.1;
    transition: opacity 0.5s;
  }
`;
