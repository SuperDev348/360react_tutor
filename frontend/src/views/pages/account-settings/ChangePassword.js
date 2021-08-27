import React from "react";
import { Button, FormGroup, Label, Row, Col } from "reactstrap";
import { Formik, Field, Form } from "formik";
import axios from "axios";
import { useParams, useLocation, useHistory } from "react-router-dom";
import * as Yup from "yup";
import { Type } from "react-feather";
import { UserContext } from "../../../../src/360/context/user";

const formSchema = Yup.object().shape({
  password: Yup.string().required("Required"),
  newPassword: Yup.string().required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Required"),
});

export default function ChangePassword() {
  const history = useHistory();
  const { user } = React.useContext(UserContext);
  console.log(user);
  const handelSubmit1 = (email, password, newPassword, confirmPassword) => {
    let form = new FormData();

    form.append("email", email);
    form.append("password", password);
    form.append("newPassword", newPassword);
    form.append("confirmPassword", confirmPassword);

    // form.append('guests', category);
    // form.append('size', city);
    // form.append("featured", featuredimage); //we use image name in the backend that's why we use image here
    // form.append("threesixty", threesixtyimage) ;// we use gallery name in the backend that's why we use gallery here

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    //   setLoading(true);
    axios
      .patch(`http://localhost:5000/api/users/update-password/`, form, config)

      .then((res) => {
        console.log(res);

        //   setLoading(false);
        history.push(`/`);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <React.Fragment>
        <Row className="pt-1">
          <Col sm="12">
            <Formik
              initialValues={{
                email: user.user.email,
                password: "",
                newPassword: "",
                confirmPassword: "",
              }}
              validationSchema={formSchema}
              onSubmit={(values, actions) => {
                // same shape as initial values
                console.log("click");
                console.log(values);

                handelSubmit1(
                  values.email,
                  values.password,
                  values.newPassword,
                  values.confirmPassword
                );
              }}
            >
              {(formikProps) => (
                <Form>
                  <FormGroup className="has-icon-left form-label-group position-relative">
                    <Field
                      name="old-password"
                      id="old-password"
                      placeholder="old password"
                      value={formikProps.values.password}
                      onChange={formikProps.handleChange("password")}
                      onBlur={formikProps.handleBlur("password")}
                      className="form-control"
                    />
                    <div className="form-control-position">
                      <Type size={20} />
                    </div>

                    <Label for="title">Old Password</Label>
                    <div style={{ color: "red" }}>
                      {formikProps.touched.password &&
                        formikProps.errors.password}
                    </div>
                  </FormGroup>

                  <FormGroup className="has-icon-left form-label-group position-relative">
                    <Field
                      name="new-password"
                      id="new-password"
                      placeholder="New Password"
                      value={formikProps.values.newPassword}
                      onChange={formikProps.handleChange("newPassword")}
                      onBlur={formikProps.handleBlur("newPassword")}
                      className="form-control"
                    />
                    <div className="form-control-position">
                      <Type size={20} />
                    </div>

                    <Label for="title">New Password</Label>
                    <div style={{ color: "red" }}>
                      {formikProps.touched.newPassword &&
                        formikProps.errors.newPassword}
                    </div>
                  </FormGroup>

                  <FormGroup className="has-icon-left form-label-group position-relative">
                    <Field
                      name="confimred-passowrd"
                      id="confimred-passowrd"
                      placeholder="Confirm Password"
                      value={formikProps.values.confirmPassword}
                      onChange={formikProps.handleChange("confirmPassword")}
                      onBlur={formikProps.handleBlur("confirmPassword")}
                      className="form-control"
                    />
                    <div className="form-control-position">
                      <Type size={20} />
                    </div>

                    <Label for="title">Confirm Password</Label>
                    <div style={{ color: "red" }}>
                      {formikProps.touched.confirmPassword &&
                        formikProps.errors.confirmPassword}
                    </div>
                  </FormGroup>

                  <div className="d-flex justify-content-start flex-wrap">
                    <Button.Ripple
                      className="mr-1 mb-1"
                      color="primary"
                      type="submit"
                    >
                      Save Changes
                    </Button.Ripple>
                    <Button.Ripple
                      className="mb-1"
                      color="danger"
                      type="reset"
                      outline
                    >
                      Cancel
                    </Button.Ripple>
                  </div>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </React.Fragment>
    </div>
  );
}
