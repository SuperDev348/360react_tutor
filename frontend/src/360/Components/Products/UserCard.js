import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import { setColor, media, setRem } from "../../styled";
import { UncontrolledTooltip } from "reactstrap";
import img from "../../Assets/corfu1.jpg";
import {
  Eye,
  Settings,
  Share,
  X,
  Check,
  Circle,
  Lock,
  Unlock,
  Clock,
  Edit,
} from "react-feather";
import { Card, CardBody, CardImg, Badge, Col, Button } from "reactstrap";
import Loading from "../../Pages/Loading";
import * as Icon from "react-feather";
import axios from "axios";
import ContentLoader, { Facebook } from "react-content-loader";
import { ProductContext } from "../../context/products";
export default function UserCard({ counter, id, index, time }) {
  React.useEffect(() => {
    ShowPlaces();
    setLoading(true);
    setInterval(() => {
      setLoading(false);
    }, 50);
  }, []);
  console.log(id);
  console.log(counter);

  const MyLoader = (props) => (
    <ContentLoader
      speed={2}
      width={300}
      height={299}
      viewBox="0 0 400 299"
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

  const { products } = React.useContext(ProductContext);
  const [loading, setLoading] = useState(false);
  const [uuid1, setUuid1] = useState("");
  const history = useHistory();
  const [userId, setUserId] = useState("");
  const [image, setimage] = useState(null);
  const [title, setTitle] = useState("");
  const [lastEditTime, setLastEditTime] = useState("");
  const [description, setdescription] = useState("");
  const [threeSixtyImage, setthreeSixtyImage] = useState(null);
  const [havePassword, setHavePassword] = useState();
  const [publish, setpublish] = useState();

  // counter
  const ids = counter.filter((item) => {
    return item.uuid1 === uuid1;
  });
  console.log(ids);
  const idss = ids.map((item) => {
    return item._id;
  });
  console.log(idss);
  const con = ids.map((item) => {
    return item.count;
  });
  console.log(con);
  // counter end

  const click = (id) => {
    history.push(`/places/${id}`, {
      product: {
        id,
      },
    });

    axios
      .put(`http://localhost:5000/api/counter/${idss}/increment/`)
      .then((res) => {
        console.log(res.data);
      });
  };
  const ShowPlaces = () => {
    axios.get(`http://localhost:5000/api/places/${id}`).then((res) => {
      console.log(res.data);
      console.log(JSON.parse(res.data.place.image));
      setTitle(res.data.place.title);
      setUuid1(res.data.place.uuid1);
      setdescription(res.data.place.description);
      setimage(JSON.parse(res.data.place.image));
      setpublish(res.data.place.publish);
      setHavePassword(res.data.place.havePassword);
      setLastEditTime(res.data.place.lastEdit);
    });
  };

  const deletePlace = (placeId) => {
    axios
      .delete(`http://localhost:5000/api/places/${id}`)
      .then((res) => {
        console.log("deleted");
        window.location.reload(true);
        ShowPlaces();
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Card1>
        <Col xl="12">
          <div className="whole-card">
            <Card>
              <CardBody>
                {/* {loading && <Loading></Loading>} */}
                <div className="image-card">
                  {image ? (
                    <CardImg
                      className="img-fluid mb-2"
                      src={image.uploadInfo.url}
                      alt="card image cap"
                    />
                  ) : (
                    MyLoader()
                  )}

                  <Badge className="index" color="primary">
                    {index + 1}
                  </Badge>

                  <Button
                    color="primary"
                    size="sm"
                    className="setting-btn"
                    onClick={() => {
                      history.push("/EditTour", {
                        prooduct: {
                          id,
                          title,
                          description,
                          havePassword,
                          threeSixtyImage,
                          image,
                          userId,
                          threeSixtyImage,
                          publish,
                        },
                      });
                    }}
                  >
                    <Settings
                      style={{
                        backgroundColor: "rgba(0, 0, 0, 0)",
                        width: "20px",
                        height: "20px",
                      }}
                      size={14}
                    ></Settings>
                  </Button>

                  <Button
                    color="primary"
                    size="sm"
                    className="hotspot-btn mr-1"
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
                        backgroundColor: "rgba(0, 0, 0, 0)",
                        width: "20px",
                        height: "20px",
                      }}
                      size={14}
                    ></Edit>
                  </Button>
                  <Button
                    color="primary"
                    size="sm"
                    className="share-btn mr-1"
                    onClick={() => {
                      history.push("/CopyMe", {
                        prooduct: {
                          id,
                          title,
                        },
                      });
                    }}
                  >
                    <Share
                      style={{
                        backgroundColor: "rgba(0, 0, 0, 0)",
                        width: "20px",
                        height: "20px",
                      }}
                      size={14}
                    ></Share>
                  </Button>

                  {havePassword ? (
                    <>
                      <Badge
                        className="have-password"
                        color="danger"
                        id="havePassword"
                      >
                        <Lock size={14}></Lock>
                      </Badge>
                    </>
                  ) : (
                    <>
                      <Badge
                        className="do-not-have-password"
                        color="success"
                        id="notHavePassword"
                      >
                        <Unlock size={14}></Unlock>
                      </Badge>
                    </>
                  )}
                  {publish ? (
                    <>
                      <Badge
                        className="puplish-btn"
                        color="success"
                        id="puplish-tour"
                      >
                        <Check size={14}></Check>
                      </Badge>
                    </>
                  ) : (
                    <>
                      <Badge
                        className="unpuplish-btn"
                        color="danger"
                        id="unpuplish-tour"
                      >
                        <X size={14}></X>
                      </Badge>
                    </>
                  )}
                </div>
                <h5
                  style={{
                    textTransform: "capitalize",
                    textAlign: "center",
                    paddingBottom: "1rem",
                    fontWeight: "bold",
                    fontSize: "1.3rem",
                  }}
                >
                  {title}
                </h5>
                <div style={{ marginTop: "10px" }}>
                  <span style={{ fontSize: "10px", paddingLeft: "1px" }}>
                    <span style={{ fontSize: "10px", paddingLeft: "10px" }}>
                      Created date:<strong> {time}</strong>
                    </span>
                  </span>
                  <br></br>
                  <span style={{ fontSize: "10px", paddingLeft: "1px" }}>
                    <span style={{ fontSize: "10px", paddingLeft: "10px" }}>
                      Last edit: <strong>{lastEditTime}</strong>
                    </span>
                  </span>
                  <br></br>
                  <span style={{ fontSize: "10px", paddingLeft: "10px" }}>
                    <span>
                      Number of views: <strong>{con}</strong>
                    </span>
                  </span>
                </div>
                <div className="description">
                  <p style={{ wordWrap: "break-word" }}>
                    Description: {description}
                  </p>
                </div>
                <div className="card-btns d-flex justify-content-between mt-5">
                  <Button.Ripple
                    className="gradient-light-primary text-white"
                    onClick={() => click(id)}
                  >
                    View
                  </Button.Ripple>

                  <Button.Ripple
                    color="danger"
                    outline
                    onClick={() => {
                      deletePlace(id);
                    }}
                  >
                    Delete
                  </Button.Ripple>
                </div>
              </CardBody>
            </Card>
          </div>
        </Col>
      </Card1>
    </>
  );
}

const Card1 = styled.div`
  .whole-card {
    width: auto;
  }
  img {
    height: 400px;
    width: 100%;
    object-fit: cover;
    position: relative;
  }
  .image-card {
    position: relative;
  }
  .description {
    margin-top: 20px;
    max-height: 100px;
    min-height: 100px;
    /* display: inline-block; */
    /* width: 100%;
    max-width: 300px; */
    width: 100%;
    white-space: pre-line;
    word-break: break-all;
  }
  .badge-glow {
    position: absolute;
    top: 15px;
    left: 15px;
    padding: 7px;
  }
  .setting-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    padding: 7px;
  }
  .share-btn {
    position: absolute;
    top: 15px;
    right: 100px;
    padding: 7px;
  }
  .hotspot-btn {
    position: absolute;
    top: 15px;
    right: 50px;
    padding: 7px;
  }
  .puplish-btn {
    background-color: rgba(40, 199, 111, 1);

    position: absolute;
    top: 15px;
    left: 45px;
    padding: 4px;
    box-shadow: 0px 0px 2px #fff;
    border-radius: 30px;
  }
  .unpuplish-btn {
    background-color: rgba(228, 39, 40, 1);

    position: absolute;
    top: 15px;
    left: 45px;
    padding: 4px;
    box-shadow: 0px 0px 2px #fff;
    border-radius: 30px;
  }
  .index {
    position: absolute;
    top: 15px;
    left: 15px;
    padding: 6px 8px;
    border-radius: 30px;
  }
  .have-password {
    /* background-color: rgba(12, 168, 253, 1); */
    background-color: rgba(228, 39, 40, 1);

    position: absolute;
    top: 15px;
    left: 75px;
    padding: 4px;
    box-shadow: 0px 0px 2px #fff;
    border-radius: 30px;
  }
  .do-not-have-password {
    background-color: #28c76f;
    /* background-color: red; */
    position: absolute;
    top: 15px;
    left: 75px;
    padding: 4px;
    box-shadow: 0px 0px 2px #fff;
    border-radius: 30px;
  }
`;
