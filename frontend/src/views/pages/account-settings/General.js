import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {
  Alert,
  Button,
  Media,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Col,
} from "reactstrap";
import img from "../../../assets/img/portrait/small/avatar-s-11.jpg";
import { UserContext } from "../../../360/context/user";
export default function General() {
  const { user } = React.useContext(UserContext);
  console.log(user.user._id);
  console.log(user);
  const [id, setId] = useState(user.user._id);
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [facebook, setFacebook] = useState("");
  const [google, setGoogle] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkid, setLinkid] = useState("");
  const [twitter, setTwitter] = useState("");
  const [website, setWebsite] = useState("");
  const [image, setImage] = useState(null);

  React.useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    axios
      .get(`http://localhost:5000/api/users/${id}`)
      .then((res) => {
        console.log(res.data);
        console.log(res.data[0].name);
        setName(res.data[0].name);
        setUsername(res.data[0].username);
        setBio(res.data[0].bio);
        setFacebook(res.data[0].facebook);
        setGoogle(res.data[0].google);
        setInstagram(res.data[0].instagram);
        setLinkid(res.data[0].linkid);
        setTwitter(res.data[0].twitter);
        setWebsite(res.data[0].website);
        setImage(res.data[0].image);
      })
      .catch((error) => {
        history.push("/");
      });
  };

  const [uid, setUid] = useState(user.user._id);
  console.log(uid);
  const history = useHistory();
  console.log(user);
  console.log(email);
  console.log(username);
  console.log(`'this is bio:'${bio}`);
  console.log(name);
  const dismissAlert = () => {
    setVisible(true);
  };

  const handleUpdate = () => {
    let form = new FormData();
    console.log("click");
    form.append("username", username);
    form.append("name", name);
    form.append("bio", bio);
    form.append("facebook", facebook);
    form.append("google", google);
    form.append("instagram", instagram);
    form.append("linkid", linkid);
    form.append("twitter", twitter);
    form.append("website", website);
    form.append("image", image);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    axios
      .patch(`http://localhost:5000/api/users/update-user/${uid}`, form, config)
      .then((response) => {
        console.log(response);
        console.log(username);

        window.location.reload(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <React.Fragment>
        <Media>
          <Media className="mr-1" left href="#">
            <Media
              className="rounded-circle"
              object
              src={image}
              alt="User"
              height="64"
              width="64"
              style={{ objectFit: "cover" }}
            />
          </Media>
          <Media className="mt-25" body>
            <div className="d-flex flex-sm-row flex-column justify-content-start px-0">
              <Button.Ripple
                tag="label"
                className="mr-50 cursor-pointer"
                color="primary"
                outline
                onChange={(event) => {
                  setImage(event.target.files[0]);
                }}
              >
                Upload Photo
                <Input type="file" name="file" id="uploadImg" hidden />
              </Button.Ripple>
            </div>
            <p className="text-muted mt-50">
              <small>Allowed JPG, GIF or PNG. Max size of 800kB</small>
            </p>
          </Media>
        </Media>
        <Form className="mt-2" onSubmit={(e) => e.preventDefault()}>
          <Row>
            <Col sm="12">
              <FormGroup>
                <Label for="userName">Username</Label>
                <Input
                  id="userName"
                  defaultValue={user.user.username}
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label for="email">Email</Label>
                <Input id="email" defaultValue={user.user.email} disabled />
              </FormGroup>
            </Col>
            <Col sm="12">
              <Alert
                className="mb-2"
                color="warning"
                isOpen={visible}
                toggle={dismissAlert}
              >
                <p className="mb-0">
                  Your email is not confirmed. Please check your inbox.
                  <span className="text-primary"> Resend Confirmation</span>
                </p>
              </Alert>
            </Col>

            <Col className="d-flex justify-content-start flex-wrap" sm="12">
              <Button.Ripple
                className="mr-50"
                type="submit"
                color="primary"
                onClick={handleUpdate}
              >
                Save Changes
              </Button.Ripple>
              <Button.Ripple type="submit" color="danger">
                Cancel
              </Button.Ripple>
            </Col>
          </Row>
        </Form>
      </React.Fragment>
    </div>
  );
}
