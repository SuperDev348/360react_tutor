import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col } from "reactstrap";
import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumb";
import AllUserCardList from "../Components/allUserCardList";
export default function AllUser() {
  const [users, setUsers] = useState([]);

  React.useEffect(() => {
    // setLoading(true);
    axios.get("http://localhost:5000/api/users/").then((response) => {
      setUsers(response.data);
      //   setProducts(response.data);
      //   setLoading(false);
      console.log(response.data);
    });

    return () => {};
  }, []);
  return (
    <React.Fragment>
      <Breadcrumbs
        breadCrumbTitle="All Users"
        breadCrumbParent="Dashboard"
        breadCrumbActive="All Users"
      />
      <Row>
        <Col sm="12">
          <AllUserCardList users={users} />
        </Col>
      </Row>
    </React.Fragment>
  );
}
