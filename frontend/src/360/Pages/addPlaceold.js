import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useLocation, useHistory } from "react-router-dom";
import { UserContext } from "../context/user";
import ContentLoader, { Facebook } from "react-content-loader";
import imageback from "../Assets/nathan-anderson-kujXUuh1X0o-unsplash.jpg";
import moment from "moment";
import "./uploadWidget.css";
import Spinner from "../../components/@vuexy/spinner/Loading-spinner";

import {
  Check,
  User,
  Mail,
  Smartphone,
  Lock,
  FileText,
  Type,
  UploadCloud,
  CheckCircle,
  XCircle,
} from "react-feather";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormGroup,
  Button,
  Label,
  Input,
  Col,
  CustomInput,
} from "reactstrap";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumb";
import Checkbox from "../../components/@vuexy/checkbox/CheckboxesVuexy";
import styled from "styled-components";

const formSchema = Yup.object().shape({
  title: Yup.string().required("Required").min(5).max(17),
  description: Yup.string().required("Required").min(5).max(170),
  passwordo: Yup.string(),
});

// rerender

export default function AddPlace() {
  const [doneUpload, setDoneUpload] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [anotherReload, setAnotherReload] = useState(false);
  const [featuredImage, setFeaturedImage] = useState(null);

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
  // same as componentDidMount for first initailize

  let widgetOptions = {
    cloudName,
    uploadPreset,
    thumbnailTransformation: [{ width: 600, height: 400, crop: "limit" }],
    sources: ["local"],
    styles: {
      palette: {
        window: "#F5F5F5",
        sourceBg: "#FFFFFF",
        windowBorder: "#0ca8fd",
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
    showDoneButton: false,
    maxImageFileSize: 10000000,
    inlineContainer: "#threeWidget",
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
  let featuredOptions = {
    cloudName,
    uploadPreset,
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
    maxFiles: 1,
    maxImageFileSize: 10000000,
    singleUploadAutoClose: true,
  };
  let openWidget = () => {
    let featuredWidget = window.cloudinary.createUploadWidget(
      featuredOptions,
      (error, result) => {
        console.log(result.event);
        if (!error && result && result.event === "queues-end") {
          console.log(result.event);
          console.log(result.info.files[0]);
          result.info.files[0].uploadInfo != null &&
            setFeaturedImage(result.info.files[0]);
          forceUpdate();
          console.log(featuredImage);
        }
      }
    );
    featuredWidget.open();
  };
  // same as componentDidUptade for each reload
  useEffect(() => {
    //openWidget()
    let widg = window.cloudinary.createUploadWidget(
      widgetOptions,
      (error, result) => {
        if (!error && result && result.event === "source-changed") {
          setLoading(false);
        }
        if (!error && result && result.event === "success") {
          postedImages.push(result.info);
          forceUpdate();
        } else if (!error && result && result.event === "queues-end") {
          setDoneUpload(true);

          widg.close();
          setReload(true);
          setLoading(true);
        }
      }
    );
    widg.open();
  }, []);
  useEffect(() => {
    if (reload == true) {
      let widgets = ["a", "b", "c", "d", "e", "f", "g"];

      widgets.map((wid) => {
        wid = window.cloudinary.createUploadWidget(
          widgetOptions,
          (error, result) => {
            if (!error && result && result.event === "source-changed") {
              setLoading(false);
            }
            if (!error && result && result.event === "success") {
              postedImages.push(result.info);
              forceUpdate();
            } else if (!error && result && result.event === "queues-end") {
              setDoneUpload(true);

              wid.close();
              setAnotherReload(true);
            }
          }
        );
        wid.open();
      });
      setLoading(true);
      setReload(false);
      setAnotherReload(true);
    } else if (anotherReload == true) {
      let widgets = ["a", "b", "c", "d", "e", "f", "g", "h"];

      widgets.map((wid) => {
        wid = window.cloudinary.createUploadWidget(
          widgetOptions,
          (error, result) => {
            if (!error && result && result.event === "source-changed") {
              setLoading(false);
            }
            if (!error && result && result.event === "success") {
              postedImages.push(result.info);
              forceUpdate();
            } else if (!error && result && result.event === "queues-end") {
              setDoneUpload(true);

              wid.close();
            }
          }
        );
        wid.open();
      });
      setAnotherReload(false);
    }
  });

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
  const history = useHistory();
  const { user } = React.useContext(UserContext);
  const format1 = "YYYY-MM-DD HH:mm:ss";
  var date1 = new Date();
  const dateTime1 = moment(date1).format(format1);
  const [showForm, setShowForm] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [featured, setFeatured] = useState(null);
  const [threesixty, setThreesixty] = useState(null);
  const [image, setImage] = useState(null);
  const [userId, setuserId] = useState(user.user._id);
  const [submitTime, setSubmitTime] = useState(dateTime1);
  const [havePassword, setHavePassword] = useState(false);
  const [passwordo, setPasswordo] = useState("");
  const [publish, setPublish] = useState(true);
  const [useit, setUseit] = useState(false);
  const [rotation, setrotation] = useState(true);
  const [rotationEdit, setRotationEdit] = useState(true);
  const [rotationSpeed, setrotationSpeed] = useState("70000");
  const [openDescription, setOpenDescription] = useState(false);
  const [loop, setLoop] = useState(true);
  const [direction, setDirection] = useState("normal");
  const [zoom, setZoom] = useState("0.6");
  const [pause, setPause] = useState(false);
  const [postedImages, setPostedImages] = useState([]);
  const [showImageFeaturedInPause, setShowImageFeaturedInPause] = useState(
    false
  );
  const [playicon, setplayicon] = useState(
    "http://localhost:3000/static/media/play-button.ee47c8c5.png"
  );
  const [disTourTitle, setDisTourTitle] = useState(false);
  const [pauseOpacity, setPauseOpacity] = useState("0.3");
  const [cssTourTitle, setCssTourTitle] = useState("tourShadow");
  const [EnableLine, setEnableLine] = useState(false);
  const [LineTitle, setLineTitle] = useState("Line1");
  const [openCarousel, setopenCarousel] = useState(false);
  const [carouselDesing, setCarouselDesing] = useState("small-image-button");
  const handelSubmit1 = (title, description, passwordo) => {
    // let postedFinal = postedImages.map((fin) => {
    //   let changedScale = fin;
    //   changedScale.url = fin.url.replace("upload/", "upload/h_2000,w_4000/");
    //   return changedScale;
    // });
    setShowForm(false);

    let form = new FormData();
    form.append("title", title);
    form.append("description", description);
    form.append("userId", userId);
    form.append("featured", JSON.stringify(featuredImage));
    form.append("threesixty", threesixty);
    form.append("time", submitTime);
    form.append("havePassword", havePassword);
    form.append("passwordo", passwordo);
    form.append("publish", publish);
    form.append("useit", useit);
    form.append("rotation", rotation);
    form.append("rotationEdit", rotationEdit);
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
    form.append("openCarousel", openCarousel);
    form.append("carouselDesing", carouselDesing);
    form.append("imgsData", JSON.stringify(postedImages));
    // form.append("imgsData", JSON.stringify(postedFinal));

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    //   setLoading(true);
    console.log(form);
    axios
      .post(`http://localhost:5000/api/places/add`, form, config)

      .then((res) => {
        console.log(res);

        //   setLoading(false);
        history.push(`/VirtualTour`);
        window.location.reload();
      })
      .catch((error) => console.log(error));

    axios.post(`http://localhost:5000/api/counter/`, { title }).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <div className="form-cont">
      <>
        <Breadcrumbs
          breadCrumbTitle="Add Your 360 Tour "
          breadCrumbParent="Dashboard"
          breadCrumbActive="Add Your 360 Tour"
        />
        {showForm ? (
          <Card>
            <CardBody className="m-2 ">
              <Formik
                initialValues={{
                  title: "",
                  description: "",
                  passwordo: "",
                }}
                validationSchema={formSchema}
                onSubmit={(values, actions) => {
                  // same shape as initial values
                  console.log("click");
                  console.log(values);
                  handelSubmit1(
                    values.title,
                    values.description,
                    values.passwordo
                  );
                }}
              >
                {(formikProps) => (
                  <Form>
                    <FormGroup className="has-icon-left form-label-group position-relative">
                      <Field
                        name="title"
                        id="nameFloatingIcons"
                        placeholder="360 tour title"
                        value={formikProps.values.title}
                        onChange={formikProps.handleChange("title")}
                        onBlur={formikProps.handleBlur("title")}
                        className="form-control"
                      />
                      <div className="form-control-position">
                        <Type size={20} />
                      </div>

                      <Label for="title">Title</Label>
                      <div style={{ color: "red" }}>
                        {formikProps.touched.title && formikProps.errors.title}
                      </div>
                    </FormGroup>
                    <FormGroup className="has-icon-left form-label-group position-relative">
                      <Input
                        type="textarea"
                        name="text"
                        id="Description"
                        rows="5"
                        placeholder="36 tour descrition"
                        value={formikProps.values.description}
                        onChange={formikProps.handleChange("description")}
                        onBlur={formikProps.handleBlur("description")}
                        className="form-control"
                      />

                      <div className="form-control-position">
                        <FileText size={20} />
                      </div>

                      <Label for="description">Description</Label>
                      <div style={{ color: "red" }}>
                        {formikProps.touched.description &&
                          formikProps.errors.description}
                      </div>
                    </FormGroup>

                    <FormGroup>
                      <div className="featured-image-parent">
                        <div
                          className="featured-image"
                          style={{
                            backgroundImage: `url(${
                              featuredImage != null && featuredImage
                                ? featuredImage.uploadInfo.url
                                : imageback
                            })`,
                          }}
                        ></div>
                        <div className="featured-image-overlay"></div>
                        {/* <div className="featured-input-choose">
                            Choose file
                          </div>
                          <div
                            className="featured-input-browse"
                            onClick={openWidget}
                          >
                            Browse
                          </div> */}

                        <div style={{ zIndex: "3" }}>
                          <Button.Ripple
                            className="mr-1 mb-1 bg-gradient-primary"
                            color="none"
                            size="lg"
                            onClick={openWidget}
                          >
                            UPLOAD FEATURED IMAGE
                          </Button.Ripple>
                        </div>
                      </div>
                    </FormGroup>
                    <FormGroup>
                      <div className="cloud-container">
                        <div id="threeWidget"></div>
                        {loading == true ? <Spinner /> : null}
                      </div>
                      <div className="thumbnail-images">
                        {postedImages.map((img) => {
                          return (
                            <div
                              className="postedImgs"
                              onClick={() => {
                                postedImages.splice(
                                  postedImages.findIndex(
                                    (i) => i.asset_id == img.asset_id
                                  ),
                                  1
                                );
                                if (postedImages.length < 1) {
                                  setDoneUpload(false);
                                }
                                forceUpdate();
                              }}
                              key={img.asset_id}
                            >
                              <img src={img.thumbnail_url} />
                              <div className="x">
                                <XCircle size={30} />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </FormGroup>
                    <hr />
                    {/* check is password */}
                    <RowPassword>
                      <div className="container-row">
                        <div className="checks">
                          <FormGroup>
                            <Label for="customFile" className="mb-1">
                              Enable password for the virtual tour{" "}
                            </Label>
                            <Checkbox
                              color="primary"
                              checked={havePassword}
                              onChange={(event) =>
                                setHavePassword(event.target.checked)
                              }
                              icon={<Lock className="vx-icon" size={16} />}
                              label="Password"
                            />
                          </FormGroup>
                        </div>

                        <div className="checks">
                          <FormGroup>
                            <Label for="customFile" className="mb-1">
                              Make your tour publish on Walkin{" "}
                            </Label>
                            <Checkbox
                              color="primary"
                              checked={publish}
                              onChange={(event) =>
                                setPublish(event.target.checked)
                              }
                              icon={
                                <UploadCloud className="vx-icon" size={16} />
                              }
                              label="Publish"
                            />
                          </FormGroup>
                        </div>

                        <div className="checks">
                          <FormGroup>
                            <Label for="customFile" className="mb-1">
                              May users user your 360 picutres ?
                            </Label>
                            <Checkbox
                              color="primary"
                              checked={useit}
                              onChange={(event) =>
                                setUseit(event.target.checked)
                              }
                              icon={
                                <CheckCircle className="vx-icon" size={16} />
                              }
                              label="I accept"
                            />
                          </FormGroup>
                        </div>
                      </div>
                    </RowPassword>
                    {/* end is passowrd */}
                    {/* password field */}
                    {havePassword ? (
                      <FormGroup className="has-icon-left form-label-group position-relative">
                        <Field
                          name="title"
                          id="nameFloatingIcons"
                          placeholder="Insert the password to protect you tour"
                          value={formikProps.values.passwordo}
                          onChange={formikProps.handleChange("passwordo")}
                          onBlur={formikProps.handleBlur("passwordo")}
                          className="form-control"
                        />
                        <div className="form-control-position">
                          <Lock size={20} />
                        </div>

                        <Label for="title">Title</Label>
                        <div style={{ color: "red" }}>
                          {formikProps.touched.passwordo &&
                            formikProps.errors.passwordo}
                        </div>
                      </FormGroup>
                    ) : (
                      ""
                    )}

                    {/* end password field  */}
                    <Button.Ripple
                      color="primary"
                      type="submit"
                      onClick={formikProps.handleSubmit}
                      className={`${
                        featuredImage != null && doneUpload == true
                          ? "proceed"
                          : "pending"
                      }`}
                    >
                      Submit
                    </Button.Ripple>
                  </Form>
                )}
              </Formik>
            </CardBody>
          </Card>
        ) : (
          <Card>
            <CardBody className="m-2 ">{MyLoader()}</CardBody>
          </Card>
        )}
      </>
    </div>
  );
}

const RowPassword = styled.div`
  .container-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin-bottom: 2rem;
    margin-top: 4rem;
  }

  .checks {
    justify-self: center;
  }
`;
