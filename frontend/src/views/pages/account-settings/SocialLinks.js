import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label, Row, Col } from "reactstrap";
import { UserContext } from "../../../360/context/user";
export default function SocialLinks() {
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
  const history = useHistory();

  console.log(instagram);
  const updateHandel = () => {
    let form = new FormData();
    form.append("username", username);
    form.append("name", name);
    form.append("bio", bio);
    form.append("facebook", facebook);
    form.append("google", google);
    form.append("instagram", instagram);
    form.append("linkid", linkid);
    form.append("twitter", twitter);
    form.append("website", website);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    axios
      .patch(`http://localhost:5000/api/users/update-user/${id}`, form, config)
      .then((response) => {
        console.log(response);
        console.log(bio);

        window.location.reload(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <React.Fragment>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Row>
            <Col sm="12">
              <FormGroup>
                <Label for="twitter">Twitter</Label>
                <Input
                  id="twitter"
                  placeholder="Add Link"
                  value={twitter}
                  onChange={(event) => setTwitter(event.target.value)}
                />
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label for="facebook">Facebook</Label>
                <Input
                  id="facebook"
                  placeholder="Add Link"
                  value={facebook}
                  onChange={(event) => setFacebook(event.target.value)}
                />
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label for="google">Google+</Label>
                <Input
                  id="google"
                  placeholder="Add Link"
                  value={google}
                  onChange={(event) => setGoogle(event.target.value)}
                />
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label for="linkedin">Linkedin</Label>
                <Input
                  id="linkedin"
                  placeholder="Add Link"
                  value={linkid}
                  onChange={(event) => setLinkid(event.target.value)}
                />
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label for="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  placeholder="Add Link"
                  value={instagram}
                  onChange={(event) => setInstagram(event.target.value)}
                />
              </FormGroup>
            </Col>

            <Col className="d-flex justify-content-start flex-wrap" sm="12">
              <Button.Ripple
                className="mr-50"
                type="submit"
                color="primary"
                onClick={updateHandel}
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
