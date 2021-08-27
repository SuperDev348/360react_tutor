import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label, Row, Col } from "reactstrap";
import { UserContext } from "../../../360/context/user";
export default function SocialLinks() {
  const { user } = React.useContext(UserContext);
  console.log(user);

  const [uid, setUid] = useState(user.user._id);
  const [email, setEmail] = useState(user.user.email);
  const [username, setUsername] = useState(user.user.username);
  const [name, setName] = useState(user.user.name);
  const [bio, setBio] = useState(user.user.bio);
  const [facebook, setFacebook] = useState(user.user.facebook);
  const [google, setGoogle] = useState(user.user.google);
  const [instagram, setInstagram] = useState(user.user.instagram);
  const [linkid, setLinkid] = useState(user.user.linkid);
  const [twitter, setTwitter] = useState(user.user.twitter);
  const [website, setWebsite] = useState(user.user.website);
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
      .patch(`http://localhost:5000/api/users/update-user/${uid}`, form, config)
      .then((response) => {
        console.log(response);
        console.log(bio);

        history.push("/");
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
