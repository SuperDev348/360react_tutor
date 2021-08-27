import React from "react";
import { UserContext } from "../../../360/context/user";
import { Card, CardHeader, CardTitle, CardBody, Button } from "reactstrap";
import {
  MoreHorizontal,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Google,
} from "react-feather";
import { useParams, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
export default function AboutCard({
  bio,
  email,
  webiste,
  facebook,
  twitter,
  instagram,
  google,
  linkid,
  name,
  username,
  iduser,

}) {
  const history = useHistory();
  const { user } = React.useContext(UserContext); // we will use it
  
  // console.log(user.user._id)
  console.log(username)
  console.log(iduser)
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>About</CardTitle>

       {user.user && user.user._id == iduser&&( <MoreHorizontal size={15} className="cursor-pointer" onClick={()=>history.push('/myacount')}/>)}
  
        </CardHeader>
        <CardBody>
          <p>{bio}</p>
          {/* 
          <div className="mt-1">
            <h6 className="mb-0">Lives:</h6>
            <p>New York, USA</p>
          </div> */}
          <div className="mt-1">
            <h6 className="mb-0">Email:</h6>
            <p>{email}</p>
          </div>

          {name == "" ? (
            ""
          ) : (
            <div className="mt-1">
              <h6 className="mb-0">Name:</h6>
              <p>{name}</p>
            </div>
          )}

          <div className="mt-1">
            <h6 className="mb-0">Username:</h6>
            <p>{username}</p>
          </div>
          <div className="mt-1">
            <h6 className="mb-0">Website:</h6>
            <p>{webiste}</p>
          </div>
          <div className="mt-1">
            <Button
              color="primary"
              size="sm"
              className="btn-icon mr-25 p-25"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = `${facebook}`;
              }}
            >
              <Facebook />
            </Button>

            <Button
              color="primary"
              size="sm"
              className="btn-icon mr-25 p-25"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = `${twitter}`;
              }}
            >
              <Twitter />
            </Button>
            <Button
              color="primary"
              size="sm"
              className="btn-icon p-25"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = `${instagram}`;
              }}
            >
              <Instagram />
            </Button>
            <Button
              color="primary"
              size="sm"
              className="btn-icon ml-25 p-25"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = `${linkid}`;
              }}
            >
              <Linkedin />
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
