import React from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../context/user";
import { LogOut,LogIn } from "react-feather";
export default function LoginLink() {
  const history = useHistory();
  const { user, userLogin, userLogout } = React.useContext(UserContext);
  if (user.token) {
    console.log(user.token);
    return (
      <Btn1>
        <div
         
        >
   
<LogOut  onClick={() => {
            userLogout();
            history.push("/");
          }} style={{ color: "white" }}/>
        </div>
      </Btn1>
    );
  }
  return (
    <>
      <Link to="/login" style={{ color: "white" }}>
        <LogIn/>
      </Link>
    </>
  );
}
const Btn1 = styled.div`
  .button {
    color: white;
    display: none;
  }
`;
