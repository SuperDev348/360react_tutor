import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Input, Label, Row, Col } from "reactstrap";
import Select from "react-select";
import chroma from "chroma-js";
import Radio from "../../../components/@vuexy/radio/RadioVuexy";
import Flatpickr from "react-flatpickr";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "flatpickr/dist/themes/light.css";
import "../../../assets/scss/plugins/forms/flatpickr/flatpickr.scss";
import { UserContext } from "../../../360/context/user";

export default function Info() {
  const [dob, setDob] = useState(new Date());
  const languages = [
    { value: "english", label: "English", color: "#7367f0" },
    { value: "french", label: "French", color: "#7367f0" },
    { value: "spanish", label: "Spanish", color: "#7367f0" },
    { value: "russian", label: "Russian", color: "#7367f0" },
    { value: "italian", label: "Italian", color: "#7367f0" },
  ];

  const handleDob = (date) => {
    setDob(date);
  };

  const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = data.color ? chroma(data.color) : "#7367f0";
      return {
        ...styles,
        backgroundColor: isDisabled
          ? null
          : isSelected
          ? data.color
          : isFocused
          ? color.alpha(0.1).css()
          : null,
        color: isDisabled
          ? "#ccc"
          : isSelected
          ? chroma.contrast(color, "white") > 2
            ? "white"
            : "black"
          : data.color,
        cursor: isDisabled ? "not-allowed" : "default",

        ":active": {
          ...styles[":active"],
          backgroundColor: !isDisabled && (isSelected ? data.color : "#7367f0"),
        },
      };
    },
    multiValue: (styles, { data }) => {
      const color = data.color ? chroma(data.color) : "#7367f0";
      return {
        ...styles,
        backgroundColor: color.alpha(0.1).css(),
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: data.color ? data.color : "#7367f0",
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: data.color,
      ":hover": {
        backgroundColor: data.color ? data.color : "#7367f0",
        color: "white",
      },
    }),
  };

  const { user } = React.useContext(UserContext);

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
                <Label for="bio">Bio</Label>
                <Input
                  type="textarea"
                  name="bio"
                  id="bio"
                  rows="3"
                  placeholder="Your bio data here..."
                  value={bio}
                  onChange={(event) => setBio(event.target.value)}
                />
              </FormGroup>
            </Col>

            <Col sm="12">
              <FormGroup>
                <Label for="url">Website URL</Label>
                <Input
                  type="url"
                  name="url"
                  id="url"
                  placeholder="Website URL"
                  value={website}
                  onChange={(event) => setWebsite(event.target.value)}
                />
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <div className="d-inline-block mr-1">
                  <Radio label="Male" defaultChecked={true} name="gender" />
                </div>
                <div className="d-inline-block mr-1">
                  <Radio label="Female" defaultChecked={false} name="gender" />
                </div>
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
