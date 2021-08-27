import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams, useHistory } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button,
  Progress,
} from "reactstrap";
import styled from "styled-components";
export default function AllUserCard({
  image,
  username,
  password,
  email,
  name,
  _id,
}) {
  const history = useHistory();
  const [userProducts, setUserProducts] = useState([]);
  const [userProductsLength, setUserProductsLength] = useState("")
  const [loading, setloading] = useState(false);

  const click = (_id) => {
    history.push(`/UserProfile/${_id}`);
  };

  const showPlaces = () => {
    setloading(true);
    axios
      .get(`http://localhost:5000/api/places/user/${_id}`)
      .then((res) => {
        console.log(res.data);
        setUserProducts(res.data);
        setUserProductsLength(res.data.length);

        setloading(false);
      });
  };
  React.useEffect(() => {
    showPlaces();
  }, []);
  return (
    <div>
      <CardUser>
        <div className="card-container">
          <Row>
            <Col lg="12">
              <Card>
                <CardHeader className="mx-auto">
                  <div className="avatar mr-1 avatar-xl">
                    <img src={image} alt="avatarImg" />
                  </div>
                </CardHeader>
                <CardBody className="text-center" style={{ height: "220px" }}>
                  <h4>{username}</h4>
                  <p>{email}</p>

                  <div className="card-btns d-flex justify-content-between">
                    <Button.Ripple
                      className="gradient-light-primary"
                      // onClick={() => {
                      //   history.push(`/UserProfile/${_id}`);
                      // }}
                      onClick={() => click(_id)}
                    >
                      MORE
                      {/* <Link to={`/UserProfile/${_id}`} style={{color:'white'}}>Show</Link> */}
                    </Button.Ripple>
                    <Button.Ripple color="danger" outline>
                      Delete
                    </Button.Ripple>
                  </div>
                  <hr className="my-2" />
                  <div className="card-btns d-flex justify-content-center">
                    <div className="float-left">
                     <span>{userProductsLength}</span>
                    </div>
                    <div className="float-right">
                  
                      <span className="ml-50 align-middle">Virtual Tours</span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </CardUser>
    </div>
  );
}

const CardUser = styled.div`
  .card-container {
  }
`;
