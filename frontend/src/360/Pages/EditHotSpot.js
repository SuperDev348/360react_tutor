import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useLocation, useHistory } from "react-router-dom";
import { UserContext } from "../context/user";
import Frame from "../../360/Pages/FrameHotspot";
import { ProductContext } from "../context/products";
import { Video, Transformation, CloudinaryContext } from "cloudinary-react";
import imago from "../Assets/360i.jpg";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import Rotate from "../Assets/rotate.png";
import RotatNo from "../Assets/rotateNo.png";
import Loading from "../Pages/Loading";
import { FaTrashAlt } from "react-icons/fa";
import { FaLayerGroup, FaPlayCircle } from "react-icons/fa";
import Carousel, { Dots, slidesToShowPlugin } from "@brainhubeu/react-carousel";
import Visited from "../Assets/view.png";
import "@brainhubeu/react-carousel/lib/style.css";

import "./EditHotSpot.css";
import { FillSpinner } from "react-spinners-kit"; //spiners
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  FormGroup,
  Form,
  Input,
  Button,
  Label,
  Container,
} from "reactstrap";
import {
  Phone,
  Lock,
  User,
  Layers,
  ChevronRight,
  Settings,
  Eye,
  Type,
  RotateCw,
  PlayCircle,
  Edit,
  Plus,
  Image,
  MapPin,
  HelpCircle,
} from "react-feather";
import { RiRotateLockLine, RiRestartLine } from "react-icons/ri";
import "../../assets/scss/pages/authentication.scss";
import { url } from "../utils/URL";
// import src from "*.bmp";

export default function ThreeSixtyTour() {
  const { user } = React.useContext(UserContext); // we will use it
  const { products } = React.useContext(ProductContext);
  const { userLogin } = React.useContext(UserContext);
  const history = useHistory();
  const { id } = useParams();
  const product = products.filter((item) => item.id === id);
  const [title, settitle] = useState(product.map((item) => item.title));
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
  const [rotationSpeed, setrotationSpeed] = useState(
    product.map((item) => item.rotationSpeed)
  );

  const [rotation, setrotation] = useState(
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
  const [css, setCss] = useState(true);
  const [css1, setCss1] = useState(true);
  const [loading, setLoading] = useState(true); // this will show the loading component
  // const [tourPlaces, setTourPlaces] = useState([]); // this will show all the places we added inside the addthreesixty form
  const [image, setImage] = useState([]); // this we be added with getplaces/ the image we added with addThreeSixty form
  const [error, setError] = useState(false); // this will show the error
  // const [place, setPlace] = useState(""); //this will be added from the addthreesixty form, will take the first place.
  const [delay, setdelay] = useState("1"); // define the delay

  //define the zoom of the tour  ,https://aframe.io/docs/1.0.0/components/camera.html#properties_zoom
  const [fov, setFov] = useState("80"); // deifne filed of view, https://aframe.io/docs/1.0.0/components/camera.html#properties_zoom
  const [startaActivePano, setstartaActivePano] = useState("0"); // define with panorama to start on startup

  // define the icon of play on start
  const [displayTitleBesideThumb, setDisplayTitleBesideThumb] = useState(true); // difne is to show title beside the thumbnail

  // opcaticy of the overlay start
  const [showCompanyTitle, setShowCompanyTitle] = useState(true); // define if we wantt to show company title in the pause
  const [compnyTitle, setCompnyTitle] = useState("WALKIN"); // define the company title.
  const [showCompanyTitleWithUrl, setshowCompanyTitleWithUrl] = useState(false); // if we will show company title with url
  const [companyUrl, setcompanyUrl] = useState("https://walkin-360.com/"); // company url,
  const [spinnerColor, setspinnerColor] = useState("#008000"); // spinner color
  const [spinnerSize, setSpinnerSize] = useState("100"); // spinner size
  const [preloaderIcon, setpreloaderIcon] = useState(
    <FillSpinner color={spinnerColor} size={spinnerSize} />
  ); // choose spinner
  // link of spinners https://www.npmjs.com/package/react-spinners-kit
  // const [animationPage, setAnimationPage] = useState('fadeInUp'); // animate  effect, https://www.npmjs.com/package/react-animated-css
  // const [animationPageDur, setAnimationPageDur] = useState('200');
  // const [animatiinThumb, setAnimatiinThumb] = useState('slideInUp'); // https://www.npmjs.com/package/react-animated-css
  // const [animatiinThumbDur, setAnimatiinThumbDur] = useState('250'); // define the direction of animation https://www.npmjs.com/package/react-animated-css
  const [nadir, setnadir] = useState(true); // define if we will use nadir .
  const [nadirImage, setnadirImage] = useState(
    "/static/media/Best-15.fae96415.jpg"
  ); // fefine the nadir image
  const [nadirScale, setnadirScale] = useState(".5 .5 .5 "); // deifne the nadir size
  const [nadirOpacity, setnadirOpacity] = useState("0.5"); // define nadir opacity
  const [openCarousel, setopenCarousel] = useState(true); // define if the carousel will be opened in the start
  const [style1, setStyle1] = useState("small-image-button"); //small-image-button
  const [isMobile, setisMobile] = useState(""); // define if the user use mobile or dekstop
  // const [activeImageCarousel, setActiveImageCarousel] = useState(false);
  const [userId, setUserId] = useState();
  const [publish, setPublish] = useState();
  const [useit, setUseit] = useState();
  const [EnableLine, setEnableLine] = useState();
  const [featured, setFeatured] = useState();
  const [LineTitle, setLineTitle] = useState("Line1");
  const [placeid, setPlaceid] = useState();
  const [deleteImage, setDeleteImage] = useState(false);
  const [effects, setEffect] = useState();
  const [imagePar, setImagePar] = useState("upload/c_limit,w_0.69/");
  const [filterdImage, setFilterdImage] = useState(null);
  const [sideBar, setSideBar] = useState(true);
  const [noFilterImage, setNoFilterImage] = useState(null);
  const [activeSide, setActiveSide] = useState("setting");
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleCurrentChange = (e) => {
    const imageTitle = filterdImage.original_filename;
    const imageDes = filterdImage.id;
    filterdImage[e.target.name] = e.target.value;
  };

  const filters = [
    {
      name: "e_red:",
      label: "Red",
      value: 0,
      min: -100,
      max: 100,
      changed: false,
    },
    {
      name: "e_green:",
      label: "Green",
      value: 0,
      min: -100,
      max: 100,
      changed: false,
    },
    {
      name: "e_blue:",
      label: "Blue",
      value: 0,
      min: -100,
      max: 100,
      changed: false,
    },
    {
      name: "e_brightness:",
      label: "Brightness",
      value: 0,
      min: -99,
      max: 100,
      changed: false,
    },
    {
      name: "e_sepia:",
      label: "Sepia",
      value: 50,
      min: 1,
      max: 100,
      changed: false,
    },
    {
      name: "e_saturation:",
      label: "Saturation",
      value: 0,
      min: -100,
      max: 100,
      changed: false,
    },
    {
      name: "e_colorize:",
      label: "Colorize",
      value: 0,
      min: 0,
      max: 100,
      changed: false,
    },
    {
      name: "e_contrast:",
      label: "Contrast",
      value: 0,
      min: -100,
      max: 100,
      changed: false,
    },
    {
      name: "e_auto_contrast:",
      label: "Auto ontrast",
      value: 0,
      min: 0,
      max: 100,
      changed: false,
    },
    {
      name: "e_vibrance:",
      label: "Vibrance",
      value: 0,
      min: -100,
      max: 100,
      changed: false,
    },
    {
      name: "e_auto_color:",
      label: "Auto color",
      value: 0,
      min: 0,
      max: 100,
      changed: false,
    },
    {
      name: "e_improve:",
      label: "Imporve",
      value: 0,
      min: 0,
      max: 100,
      changed: false,
    },
    {
      name: "e_gamma:",
      label: "Gamma",
      value: 0,
      min: -50,
      max: 150,
      changed: false,
    },
    {
      name: "e_oil_paint:",
      label: "Oil paint",
      value: 0,
      min: 0,
      max: 100,
      changed: false,
    },
    {
      name: "e_pixelate_faces:",
      label: "Pixelate faces",
      value: 1,
      min: 1,
      max: 2000,
      changed: false,
    },
    {
      name: "e_blur:",
      label: "Blur",
      value: 1,
      min: 1,
      max: 2000,
      changed: false,
    },
    {
      name: "e_blur_faces:",
      label: "Blur faces",
      value: 1,
      min: 1,
      max: 2000,
      changed: false,
    },
  ];

  function useForceUpdate() {
    const [value, setValue] = useState(0); // integer state
    return () => setValue((value) => ++value); // update the state to force render
  }
  //here you can change cloudinary settings to be yours
  // --------------------------------------------------
  // const cloudName = "dfjgtalry";
  // const uploadPreset = "ahmedImageUpload";

  const cloudName = "dx1zby8rs";
  const uploadPreset = "uploaded_from_react";
  //---------------------------------------------------
  const forceUpdate = useForceUpdate();
  let widgetOptions = {
    cloudName,
    uploadPreset,
    thumbnailTransformation: [{ width: 600, height: 400, crop: "limit" }],
    sources: ["local"],
    styles: {
      palette: {
        window: "#F5F5F5",
        sourceBg: "#FFFFFF",
        windowBorder: "#c0c0c0",
        tabIcon: "#0094c7",
        inactiveTabIcon: "#69778A",
        menuIcons: "#0094C7",
        link: "#0ca8fd",
        action: "#F5F5F5",
        inProgress: "#0194c7",
        complete: "#53ad9d",
        error: "#c43737",
        textDark: "#000000",
        textLight: "#FFFFFF",
      },
    },
    maxFiles: 59999999,
    maxImageFileSize: 7000000,
    singleUploadAutoClose: false,
    return_delete_token: true,
    text: {
      en: {
        menu: {
          files: "UPLOAD 360 IMAGES",
        },

        queue: {
          done: "",
        },
        local: {
          dd_title_single: "Drag and Drop 360 images here",
          dd_title_multi: "Drag and Drop 360 images here",
          drop_title_single: "Drag and Drop 360 images here",
          drop_title_multiple: "Drag and Drop 360 images here",
        },
      },
    },
  };

  let openWidget = () => {
    let featuredWidget = window.cloudinary.createUploadWidget(
      widgetOptions,
      (error, result) => {
        if (!error && result && result.event === "success") {
          image.push(result.info);
          updatePlace(placeid, image.length - 1);
          featuredWidget.close();

          forceUpdate();
        } else if (!error && result && result.event === "queues-end") {
          // featuredWidget.close();
          forceUpdate();
        }
      }
    );
    featuredWidget.open();
  };

  const getPlaces = (i) => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/places/${id}`)
      .then((res) => {
        setPlaceid(res.data.place.id);
        setPublish(res.data.place.publish);
        setUserId(res.data.place.userId);
        console.log(res.data.place);
        setImage(JSON.parse(res.data.place.imgsData[0]));
        let img = JSON.parse(res.data.place.imgsData[0])[i];

        setFilterdImage(img);

        img.originUrl
          ? setNoFilterImage(img.originUrl)
          : setNoFilterImage(img.url);
        img.imagePar
          ? setImagePar(img.imagePar)
          : setImagePar("upload/c_limit,w_0.69/");
        img.filters ? setEffect(img.filters) : setEffect(filters);
        //res.data.place.tourHd == "true" ? setHd(true) : setHd(false);
        settitle(res.data.place.title);
        setFeatured(JSON.parse(res.data.place.image));
        setrotation(res.data.place.rotation);
        setrotationSpeed(res.data.place.rotationSpeed);
        setdescription(res.data.place.description);
        setopenDescription(res.data.place.openDescription);
        setpasswordo(res.data.place.passwordo);
        sethavePassword(res.data.place.havePassword);
        setdirection(res.data.place.direction);
        setLoop(res.data.place.loop);
        setUseit(res.data.place.useit);
        setZoom(res.data.place.zoom);
        setPause(res.data.place.pause);
        setdisTourTitle(res.data.place.disTourTitle);
        setpauseOpacity(res.data.place.pauseOpacity);
        setCssTourTitle(res.data.place.cssTourTitle);
        setshowImageFeaturedInPause(res.data.place.showImageFeaturedInPause);
        setplayicon(res.data.place.playicon);
        setEnableLine(res.data.place.EnableLine);
        setLineTitle(res.data.place.LineTitle);
        setLoading(false);
      })
      .catch((error) => {
        // showAlert({
        //   msg: `Dear Admin add tour `,
        //   type: "success",
        //   show: true,
        // });
        //history.push("/");
        console.log(error);
      });
  };

  let updatePlace = (pid, x) => {
    let postedFinal = image.map((fin) => {
      let changedScale = fin;
      changedScale.url = fin.url.includes("upload/c_limit,w_0.69/")
        ? fin.url
        : fin.url.replace("upload/", "upload/c_limit,w_0.69/");
      return changedScale;
    });
    let form = new FormData();
    form.append("title", title); // ok
    form.append("description", description); //ok
    form.append("userId", userId); //ok
    form.append("featured", JSON.stringify(featured));
    form.append("havePassword", havePassword); //ok
    form.append("passwordo", passwordo); //ok
    form.append("publish", publish); //ok
    form.append("rotation", rotation); //ok
    form.append("rotationSpeed", rotationSpeed); //ok
    form.append("openDescription", openDescription); //ok
    form.append("loop", loop); //ok
    form.append("direction", direction); //ok
    form.append("zoom", zoom); //ok
    form.append("pause", pause); //ok
    form.append("showImageFeaturedInPause", showImageFeaturedInPause); //ok
    form.append("playicon", playicon); //ok
    form.append("disTourTitle", disTourTitle); //ok
    form.append("pauseOpacity", pauseOpacity); //ok
    form.append("cssTourTitle", cssTourTitle); //ok
    form.append("EnableLine", EnableLine); //ok
    form.append("LineTitle", LineTitle); //ok
    form.append("imgsData", JSON.stringify(image));

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .patch(`http://localhost:5000/api/places/${pid}`, form, config)

      .then((res) => {
        console.log(res);
        getPlaces(x);
        forceUpdate();
      })
      .catch((error) => console.log(error));
  };
  React.useEffect(() => {
    getPlaces(0);
    setEffect(filters);
    if (image.length == 1) {
      setDeleteImage(true);
    }
  }, []);
  React.useEffect(() => {
    if (image.length == 1) {
      setDeleteImage(true);
    } else if (image.length > 1) {
      setDeleteImage(false);
    }
  });

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
  //       <div> {preloaderIcon}</div>
  //     </div>
  //   );
  // }
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <WholePageContainer>
        <div className="all-page">
          {console.log(image)}

          <div>
            <RotationBtn>
              <div className="top-bar">
                <>
                  {rotation ? (
                    <IconButton
                      aria-label="delete"
                      style={{
                        outline: "none",
                        backgroundColor: "rgba(255,0,0,0.0)",
                        zIndex: "11111",
                      }}
                      onClick={() => {
                        return setrotation(false);
                      }}
                    >
                      <img
                        src={Rotate}
                        size={25}
                        style={{
                          color: "white",
                          backgroundColor: "rgba(255,0,0,0.0)",
                          width: "27px",
                          height: "25px",
                        }}
                      />
                    </IconButton>
                  ) : (
                    <IconButton
                      aria-label="delete"
                      style={{
                        outline: "none",
                        backgroundColor: "rgba(255,0,0,0.0)",
                        zIndex: "11111",
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
                        }}
                      />
                    </IconButton>
                  )}
                </>
              </div>
            </RotationBtn>

            <div className="page-container">
              <LeftSidBar>
                <div className="side-container">
                  <div className={`sideBar-side `}>
                    {/* upload image sidebar */}
                    <div className="uploadbtn" onClick={openWidget}>
                      <Plus></Plus>
                    </div>
                    {/* end upload image sidebar */}

                    {/* image setting */}
                    <div
                      className={`${
                        activeSide == "setting" ? "activeSide" : "notActive"
                      }`}
                      onClick={() => {
                        setActiveSide("setting");
                      }}
                    >
                      <Image style={{ color: "white" }}></Image>
                    </div>

                    {/* end image settings */}

                    {/* empty sider bar */}
                    <div
                      className={`${
                        activeSide == "empty" ? "activeSide" : "notActive"
                      }`}
                      onClick={() => {
                        setActiveSide("empty");
                      }}
                    >
                      <MapPin style={{ color: "white" }}></MapPin>
                    </div>

                    {/* end empty sider bar */}

                    {/* hotstpor sidbar */}

                    <div
                      className={`${
                        activeSide == "hotspot" ? "activeSide" : "notActive"
                      }`}
                      onClick={() => {
                        setActiveSide("hotspot");
                      }}
                    >
                      <i class="fas fa-location-arrow"></i>
                    </div>

                    {/* end hotstpor sidbar */}
                    {/* help btn */}

                    <div
                      className="uploadbtn"
                      onClick={() => {
                        history.push("/faq");
                      }}
                    >
                      <HelpCircle></HelpCircle>
                    </div>
                    {/* end help */}
                  </div>

                  <div className={`sideBar-container`}>
                    {activeSide == "setting" && (
                      <div className="panorama-content">
                        <div>
                          <div className="panorama-settings">
                            <div className="p-right-side">
                              <Container>
                                <div
                                  style={
                                    {
                                      // marginBottom: "3rem",
                                      // border: "1px solid white",
                                      // width: "300px",
                                    }
                                  }
                                >
                                  <Row>
                                    <Col className="pl-0 pr-0 mb-4">
                                      {/* layer btn */}
                                      <div
                                        style={{
                                          display: "inline-block",
                                          marginTop: "5px",
                                        }}
                                      >
                                        <Layers
                                          className="align-top"
                                          size={25}
                                          color="#0ca8fd"
                                          style={{
                                            margin: "4px",
                                            cursor: "pointer",
                                          }}
                                          onClick={() => {
                                            history.push("/VirtualTour");
                                          }}
                                        />
                                        {/* end layer btn */}

                                        {/* chevron */}

                                        <ChevronRight />
                                        {/* <span
                                          style={{
                                            position: "relative",
                                            textTransform: "uppercase",
                                            fontSize: "11px",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          {title}
                                        </span> */}

                                        {/* chevron end */}
                                        {/* setting start */}
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
                                            right: "7rem",
                                            cursor: "pointer",
                                            color: "#0ca8fd",
                                          }}
                                        >
                                          <Settings
                                            className="align-top"
                                            size={20}
                                            onClick={() => {
                                              history.push("/EditTour", {
                                                prooduct: {
                                                  id,
                                                  title,
                                                  description,
                                                  havePassword,
                                                  image,
                                                  userId,
                                                  publish,
                                                },
                                              });
                                            }}
                                          />
                                        </button>
                                        {/* setting start */}
                                        {/* eye start */}
                                        <button
                                          style={{
                                            position: "absolute",
                                            right: "0rem",
                                            cursor: "pointer",
                                            color: "#0ca8fd",
                                            border: "none",
                                            backgroundColor: "rgba(0, 0, 0, 0)",
                                            outline: "none",
                                            borderLeft: "1px solid #b8c2cc",
                                            paddingLeft: "15px",
                                          }}
                                          onClick={() =>
                                            window.open(
                                              `/places/${id}`,
                                              "_blank"
                                            )
                                          }
                                        >
                                          <Eye
                                            className="align-top"
                                            size={20}
                                          />
                                        </button>
                                        {/* reset */}
                                        <button
                                          style={{
                                            position: "absolute",
                                            right: "4rem",
                                            cursor: "pointer",
                                            color: "#0ca8fd",
                                            border: "none",
                                            backgroundColor: "rgba(0, 0, 0, 0)",
                                            outline: "none",
                                            borderLeft: "1px solid #b8c2cc",
                                            paddingLeft: "15px",
                                          }}
                                          onClick={(e) => {
                                            const brandNewImage = {
                                              ...filterdImage,
                                            };
                                            brandNewImage.url = noFilterImage;
                                            brandNewImage.filters = filters;
                                            brandNewImage.imagePar =
                                              "upload/c_limit,w_0.69/";
                                            brandNewImage.originUrl = noFilterImage;

                                            console.log(brandNewImage);
                                            setEffect(filters);
                                            setImagePar(
                                              "upload/c_limit,w_0.69/"
                                            );
                                            image[
                                              image.indexOf(
                                                image.filter(
                                                  (f) =>
                                                    f.asset_id ==
                                                    brandNewImage.asset_id
                                                )[0]
                                              )
                                            ] = brandNewImage;
                                            setFilterdImage(brandNewImage);
                                            console.log(image);
                                            forceUpdate();

                                            updatePlace(placeid, currentIndex);
                                          }}
                                        >
                                          <RotateCw
                                            className="align-top"
                                            size={20}
                                          />
                                        </button>
                                      </div>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>
                                      <h4
                                        style={{
                                          color: "white",
                                          textAlign: "center",
                                          marginBottom: "3rem",
                                        }}
                                      >
                                        PANORAMA SETTINGS
                                      </h4>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col className="pl-0 pr-0 mb-1">
                                      <FormGroup>
                                        <div>
                                          <img
                                            src={filterdImage.thumbnail_url}
                                            style={{
                                              width: "100%",
                                              hieght: "200px",
                                              zIndex: "11111111",
                                            }}
                                            alt=""
                                          ></img>
                                          {/* <span
                                            style={{
                                              position: "fixed",
                                              left: "5px",
                                              top: "5px",
                                            }}
                                          >
                                            {filterdImage.title}
                                          </span> */}
                                        </div>
                                      </FormGroup>
                                    </Col>
                                  </Row>
                                </div>
                                <Row className="pl-0 pr-0 mb-1">
                                  <Col className="pl-0 pr-0 mb-1">
                                    <FormGroup className="has-icon-left form-label-group position-relative">
                                      <Input
                                        name="title"
                                        type="text"
                                        name="title"
                                        placeholder={
                                          filterdImage.title
                                            ? filterdImage.title
                                            : "Title..."
                                        }
                                        onChange={handleCurrentChange}
                                        className="form-control"
                                        style={{ border: "1px solid black" }}
                                      />
                                      <div className="form-control-position">
                                        <Type
                                          size={20}
                                          style={{ color: "#0ca8fd" }}
                                        />
                                      </div>

                                      <Label for="title">360 image title</Label>
                                    </FormGroup>
                                  </Col>
                                </Row>

                                <Row>
                                  <Col className="pl-0 pr-0 mb-1">
                                    <FormGroup className="has-icon-left form-label-group position-relative">
                                      <Input
                                        type="textarea"
                                        rows="3"
                                        id="nameFloatingIcons"
                                        placeholder="360 tour title"
                                        name="description"
                                        placeholder={
                                          filterdImage.description
                                            ? filterdImage.description
                                            : "desctiption..."
                                        }
                                        onChange={handleCurrentChange}
                                        className="form-control"
                                        style={{ border: "1px solid black" }}
                                      />
                                      <div className="form-control-position">
                                        <Type
                                          size={20}
                                          style={{ color: "#0ca8fd" }}
                                        />
                                      </div>

                                      <Label for="title">
                                        {" "}
                                        360 image descriptiopn
                                      </Label>
                                    </FormGroup>
                                  </Col>
                                </Row>
                              </Container>
                            </div>
                          </div>
                        </div>

                        <div className="panorama-effetcs">
                          <Row>
                            <Col>
                              <h4
                                style={{
                                  color: "white",
                                  textAlign: "center",
                                  marginBottom: "3rem",
                                }}
                              >
                                PANORAMA EFFECTS
                              </h4>
                            </Col>
                          </Row>

                          <form className="setting">
                            {effects.map((fil) => {
                              return (
                                <div className="collected">
                                  <label
                                    className={`filterName ${
                                      fil.changed && "reset-active"
                                    }`}
                                  >
                                    <div>{fil.label}</div>

                                    <div>{fil.value}</div>
                                    <input
                                      type="reset"
                                      value="Reset"
                                      onMouseDown={(e) => {
                                        let reset = [...effects];
                                        reset.filter(
                                          (effect) => effect.name == fil.name
                                        )[0].value = filters.filter(
                                          (filter) => filter.name == fil.name
                                        )[0].value;

                                        setEffect(reset);
                                        imagePar.includes(fil.name)
                                          ? setImagePar(
                                              imagePar.replace(
                                                imagePar.substring(
                                                  imagePar.indexOf(fil.name),
                                                  imagePar.indexOf(
                                                    "/",
                                                    imagePar.indexOf(fil.name)
                                                  ) + 1
                                                ),
                                                `${fil.name}${fil.value}/`
                                              )
                                            )
                                          : setImagePar(
                                              `${imagePar}${fil.name}${fil.value}/`
                                            );
                                      }}
                                      onMouseUp={() => {
                                        let resetImgParOil = imagePar;
                                        imagePar.includes("e_oil_paint:0") &&
                                          (resetImgParOil = imagePar.replace(
                                            "/e_oil_paint:0/",
                                            "/"
                                          ));
                                        imagePar.includes("e_sepia:50") &&
                                          (resetImgParOil = imagePar.replace(
                                            "/e_sepia:50/",
                                            "/"
                                          ));
                                        //console.log(imagePar)
                                        fil.changed = false;
                                        console.log(noFilterImage);
                                        console.log(filterdImage);
                                        const brandNewImage = {
                                          ...filterdImage,
                                        };
                                        brandNewImage.url = noFilterImage.replace(
                                          "upload/c_limit,w_0.69/",
                                          resetImgParOil
                                        );

                                        brandNewImage.filters = effects;
                                        brandNewImage.imagePar = imagePar;
                                        brandNewImage.originUrl = noFilterImage;
                                        console.log(brandNewImage);

                                        setFilterdImage(brandNewImage);

                                        image[
                                          image.indexOf(
                                            image.filter(
                                              (f) =>
                                                f.asset_id ==
                                                filterdImage.asset_id
                                            )[0]
                                          )
                                        ] = brandNewImage;
                                        updatePlace(placeid, currentIndex);
                                        console.log(filterdImage);
                                        forceUpdate();
                                      }}
                                    />
                                  </label>
                                  <input
                                    type="range"
                                    step="1"
                                    min={fil.min}
                                    max={fil.max}
                                    id={fil.name}
                                    onChange={(e) => {
                                      fil.value = e.target.value;
                                      fil.changed = true;

                                      imagePar.includes(fil.name)
                                        ? setImagePar(
                                            imagePar.replace(
                                              imagePar.substring(
                                                imagePar.indexOf(fil.name),
                                                imagePar.indexOf(
                                                  "/",
                                                  imagePar.indexOf(fil.name)
                                                ) + 1
                                              ),
                                              `${fil.name}${fil.value}/`
                                            )
                                          )
                                        : setImagePar(
                                            `${imagePar}${fil.name}${fil.value}/`
                                          );
                                      console.log(imagePar);
                                    }}
                                    onMouseUp={() => {
                                      let resetImgParOilPaint = imagePar;
                                      imagePar.includes("e_oil_paint:0") &&
                                        (resetImgParOilPaint = imagePar.replace(
                                          "/e_oil_paint:0/",
                                          "/"
                                        ));
                                      imagePar.includes("e_sepia:50") &&
                                        (resetImgParOilPaint = imagePar.replace(
                                          "/e_sepia:50/",
                                          "/"
                                        ));
                                      fil.value ==
                                      filters.filter(
                                        (filter) => filter.name == fil.name
                                      )[0].value
                                        ? (fil.changed = false)
                                        : (fil.changed = true);

                                      const brandNewImage = { ...filterdImage };
                                      imagePar.includes("e_oil_paint:0") &&
                                        setImagePar(
                                          imagePar.replace(
                                            "/e_oil_paint:0/",
                                            "/"
                                          )
                                        );
                                      imagePar.includes("e_sepia:50") &&
                                        setImagePar(
                                          imagePar.replace("/e_sepia:50/", "/")
                                        );
                                      brandNewImage.url = noFilterImage.replace(
                                        "upload/c_limit,w_0.69/",
                                        resetImgParOilPaint
                                      );

                                      brandNewImage.filters = effects;

                                      brandNewImage.imagePar = imagePar;
                                      brandNewImage.originUrl = noFilterImage;
                                      console.log(brandNewImage);

                                      setFilterdImage(brandNewImage);
                                      console.log(filterdImage);
                                    }}
                                    defaultValue={fil.value}
                                  />
                                </div>
                              );
                            })}

                            <div className="form-actions">
                              {user.user == null ? (
                                <div></div>
                              ) : userId == user.user._id ? (
                                <div
                                  style={{
                                    display: "flex",
                                    width: "100%",
                                    justifyContent: "space-between",
                                    marginTop: "40px",
                                  }}
                                >
                                  <Button.Ripple
                                    className="mr-1 bg-gradient-danger"
                                    type="reset"
                                    value="Reset"
                                    onClick={(e) => {
                                      const brandNewImage = { ...filterdImage };
                                      brandNewImage.url = noFilterImage;
                                      brandNewImage.filters = filters;
                                      brandNewImage.imagePar =
                                        "upload/c_limit,w_0.69/";
                                      brandNewImage.originUrl = noFilterImage;

                                      console.log(brandNewImage);
                                      setEffect(filters);
                                      setImagePar("upload/c_limit,w_0.69/");
                                      image[
                                        image.indexOf(
                                          image.filter(
                                            (f) =>
                                              f.asset_id ==
                                              brandNewImage.asset_id
                                          )[0]
                                        )
                                      ] = brandNewImage;
                                      setFilterdImage(brandNewImage);
                                      console.log(image);
                                      forceUpdate();

                                      updatePlace(placeid, currentIndex);
                                    }}
                                  >
                                    Reset
                                  </Button.Ripple>

                                  <Button.Ripple
                                    className="bg-gradient-primary"
                                    type="submit"
                                    value="Submit Changes"
                                    type="submit"
                                    value="Submit Changes"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      image[
                                        image.indexOf(
                                          image.filter(
                                            (f) =>
                                              f.asset_id ==
                                              filterdImage.asset_id
                                          )[0]
                                        )
                                      ] = filterdImage;
                                      updatePlace(
                                        placeid,
                                        image.indexOf(filterdImage)
                                      );
                                      console.log(image);
                                      forceUpdate();
                                    }}
                                  >
                                    Submit changes
                                  </Button.Ripple>
                                </div>
                              ) : (
                                <div></div>
                              )}
                            </div>
                          </form>
                        </div>
                      </div>
                    )}
                    {activeSide == "empty" && (
                      <div className="empty-content">empty div</div>
                    )}
                    {activeSide == "hotspot" && (
                      <div className="hotspot-content">
                        hotspot div "under maintenance "
                      </div>
                    )}
                  </div>
                </div>
              </LeftSidBar>

              <div className="tour-container">
                <Tour>
                  {/* // if we define to have rotation the 360 , then what will show, we will go for checking the nadir , if we have nadir or not. */}

                  {!loading && nadir && rotation ? (
                    <Frame
                      width="70%"
                      height="80vh"
                      image={filterdImage.url}
                      animation={`property: rotation; from:0 0 0; to: 0 360 0; loop: ${loop}; dur: ${rotationSpeed} delay:${delay}; dir:${direction};`}
                      zoom={zoom}
                      fov={fov}
                      nadir={nadirImage}
                      nadirScale={nadirScale}
                      nadirOpacity={nadirOpacity}
                      onClick={() => console.log("elias")}
                      loading={true}
                    />
                  ) : (
                    <Frame image={filterdImage.url} zoom={zoom} fov={fov} />
                  )}
                </Tour>
                {/* // here we define if not pause, to show the carousel */}
                <CarouselContainer>
                  <div>
                    {!pause && openCarousel ? ( // here we define if the carousel is start with open or close status
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
                                        className="carousel-children"
                                        onDoubleClick={() => {
                                          console.log(p);
                                          setLoading(true);
                                          // setActiveImageCarousel(true);
                                          setFilterdImage(p);
                                          setCurrentIndex(image.indexOf(p));
                                          forceUpdate();
                                          p.filters
                                            ? setEffect(p.filters)
                                            : setEffect(filters);
                                          getPlaces(image.indexOf(p));

                                          setInterval(() => {
                                            setLoading(false);
                                          }, 500);
                                        }}
                                      >
                                        <div
                                          className={`${
                                            p.thumbnail_url ==
                                            filterdImage.thumbnail_url
                                              ? "activeImage"
                                              : "notActiveImage"
                                          }`}
                                        >
                                          {p.thumbnail_url !==
                                            filterdImage.thumbnail_url && (
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
                                            filterdImage.thumbnail_url && (
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
                                            filterdImage.thumbnail_url && (
                                            <Edit
                                              size={20}
                                              className="visited"
                                              style={{
                                                color: "white",
                                                position: "absolute",
                                                left: "10px",
                                                top: "10px",
                                                color: "#0ca8fd",
                                              }}
                                            ></Edit>
                                          )}
                                          <img
                                            //thumb
                                            className="play-btn"
                                            src={p.thumbnail_url}
                                            width="200"
                                            key={p.asset_id}
                                          />
                                          {p.thumbnail_url !==
                                            filterdImage.thumbnail_url && (
                                            <Edit
                                              size={40}
                                              className="onhoverplay"
                                            />
                                          )}
                                          {user.user == null ? (
                                            <div></div>
                                          ) : userId == user.user._id ? (
                                            <>
                                              {deleteImage == false ? (
                                                <div
                                                  className="delete-image"
                                                  onClick={() => {
                                                    if (image.length > 1) {
                                                      image.splice(
                                                        image.findIndex(
                                                          (i) =>
                                                            i.asset_id ==
                                                            p.asset_id
                                                        ),
                                                        1
                                                      );
                                                      updatePlace(placeid, 0);
                                                    } else {
                                                      setDeleteImage(true);
                                                    }
                                                  }}
                                                >
                                                  <i className="far fa-trash-alt"></i>
                                                </div>
                                              ) : (
                                                <div></div>
                                              )}
                                            </>
                                          ) : (
                                            <div></div>
                                          )}
                                          {displayTitleBesideThumb && ( // here we define if there is title inside the carousel
                                            <h1 className="image-title">
                                              {p.title ? p.title : ""}
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
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </CarouselContainer>
              </div>
            </div>
          </div>
        </div>
      </WholePageContainer>
    </>
  );
}
const WholePageContainer = styled.div`
  .page-container {
    width: 100vw;
    height: 100vh;
    display: flex;
    position: absolute;
    top: 0px;
    flex-direction: row-reverse;
    justify-content: space-between;
  }
  .all-page {
    height: 100%;
    overflow: hidden;
  }
  .tour-container {
    width: 75%;
  }
`;
const RotationBtn = styled.div``;
const LeftSidBar = styled.div`
  .side-container {
    width: 24%;
    display: flex;

    flex-direction: row-reverse;
  }

  .side-container {
    width: 25%;
    display: flex;

    flex-direction: row-reverse;
  }
  .sideBar-container {
    position: absolute;
    top: 0px;
    display: flex;
    flex-direction: column;
    height: 100vh;
    z-index: 10000;
    width: 25%;
    min-width: 350px;
    right: 3%;
    color: white;
    font-size: 19px;
    font-weight: bold;
    padding: 80px 2rem 20px 2rem;
    background-color: rgba(0, 0, 0, 1);
    overflow-y: scroll;
    transition: all 1s;
  }
  .panorama-settings {
    margin-top: 5px;
    margin-bottom: 30px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
  }
  input[type="range"] {
    -webkit-appearance: none;
    width: 100%;
    margin-bottom: 20px;
  }

  input[type="range"]::-webkit-slider-runnable-track {
    width: 300px;
    height: 3px;
    background: #dce6e9;
    border: none;
  }
  .form-actions {
    border: none;
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: #ffffff;
    margin-top: -6px;
  }

  input[type="range"]:focus {
    outline: none;
  }

  input[type="range"]:focus::-webkit-slider-runnable-track {
    background: #ccc;
  }

  input[type="range"]::-moz-range-track {
    width: 300px;
    height: 3px;
    background: #dce6e9;
    border: none;
  }

  input[type="range"]::-moz-range-thumb {
    border: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: #95c6c6;
  }

  input[type="range"]:-moz-focusring {
    outline: 1px solid #dce6e9;
    outline-offset: -1px;
  }

  label.filterName {
    font-weight: 400;
    text-transform: uppercase;
    color: #ffffff;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;

    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    margin-bottom: 10px;
    font-size: 12px;
    letter-spacing: 0.2em;
    opacity: 0.5;
  }
  .filterName input[type="reset"] {
    background-color: #4caf4f00;
    border: none;
    color: rgb(247, 77, 77);
    text-decoration: none;
    font-size: 12px;
    outline: none;
    display: none;
    position: absolute;
    right: 43%;
    margin-bottom: 7px;
  }

  .reset-active input[type="reset"] {
    display: block;
  }
  .form-actions input[type="reset"] {
    background-color: #4caf4f00;
    border: none;
    color: rgb(247, 77, 77);
    text-decoration: none;
    outline: none;
  }

  .form-actions input[type="reset"]:hover {
    color: rgb(250, 48, 48);
  }
  .form-actions input[type="submit"] {
    background-color: #4caf4f00;
    border: none;
    color: rgb(97, 247, 77);
    text-decoration: none;
    outline: none;
  }
  .form-actions input[type="submit"]:hover {
    color: rgb(74, 247, 52);
  }
  .sideBar-side {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: absolute;
    top: 0px;
    padding-top: 56px;
    z-index: 100000;
    right: 0px;
    height: 100vh;
    width: 3%;
    min-width: 50px;
    color: white;
    font-size: 19px;
    font-weight: bold;
    background-color: rgba(0, 0, 0, 1);
    transition: all 1s;
  }
  .sideBar-button-i {
    width: 100%;
    border-radius: 0;
  }
  .sideBar-side div {
    width: 100%;
    background-color: rgba(0, 0, 0, 1);
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .sideBar-side div:hover {
    background-color: #171717;
    cursor: pointer;
  }
  .activeSide {
    background: #0ca8fd !important;
    /* border-left: 5px solid white; */
  }
`;
const Tour = styled.div``;
const CarouselContainer = styled.div`
  .visited {
    /* -webkit-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
    box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75); */
  }
  .image-overlay {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 1;
    transition: all 0.4s;
    z-index: "1111111111";
  }

  .none {
    display: none !important;
  }

  .BrainhubCarousel__container {
    position: absolute;
    width: 72%;
    height: 20vh;
    bottom: 0px;
    left: 0px;
    background-color: rgb(0 0 0);

    z-index: 2;
  }
  .carousel-children {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 0.6rem;
    height: 145px;
  }
  .onhoverplay {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: white;
    opacity: 0;
  }
  .carousel-children div:hover .onhoverplay {
    opacity: 1;
    transition: opacity 0.3s;
  }
  .carousel-children div:hover .image-overlay {
    opacity: 0.7;
    transition: all 0.4s;
  }
  .carousel-children div:hover .delete-image {
    opacity: 1;
    transition: opacity 0.4s;
  }
  .carousel-children div {
    height: 120px;
    width: 100%;
    background-color: black;
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    -webkit-box-align: center;
    -webkit-box-pack: center;
    overflow-wrap: anywhere;
  }
  .carousel-children div img {
    object-fit: cover;
    height: 100%;
  }
  .delete-image {
    font-size: 15px;
    height: 25% !important;
    width: 20% !important;
    color: white;
    /* background-color: rgb(223, 45, 45) !important; */
    position: absolute !important;
    top: 0px;
    right: 0px;
    display: flex;
    opacity: 0;
    justify-content: center;
    align-items: center;
    z-index: 5;
    transition: opacity 0.4s;
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

  .image-title {
    font-size: 15px;
    margin: 5px;
    position: absolute;
    color: white;
    text-shadow: 4px 4px 2px rgba(0, 0, 0, 0.5);
    text-transform: uppercase;
    opacity: 1;
  }

  .carousel-children div:hover .image-title {
    opacity: 0.1;
    transition: opacity 0.5s;
  }
  .activeImage::after {
    /* display: block;
    content: "";
    z-index: 111111;
    width: 15px;
    height: 15px;
    border-radius: 10px;
    border: 4px solid #0ca8fd;
    position: absolute;
    left: 10px;
    top: 7px;
    background-color: black;
    opacity: 0;
    -webkit-box-shadow: 10px 10px 5px -6px rgba(0, 0, 0, 1);
    -moz-box-shadow: 10px 10px 5px -6px rgba(0, 0, 0, 1);
    box-shadow: 10px 10px 5px -6px rgba(0, 0, 0, 1);
    transition: opacity 0.5s; */
  }
`;
