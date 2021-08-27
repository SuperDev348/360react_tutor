import React from 'react';
// import { FaWindowClose } from 'react-icons/fa';
import { UserContext } from '../context/user';
import styled from 'styled-components';
import { BsFillXCircleFill } from 'react-icons/bs';

export default function Alert() {
  const { alert, hideAlert } = React.useContext(UserContext);

  let css = 'alert-container';
  if (alert.show) {
    css += ' alert-show';
    if (alert.type === 'danger') {
      css += ' alert-danger1';
    }
  }
  return (
    <Alert1>
      <div className={css}>
        <div className="cover-alert"></div>
        <div>
          <div>
            <p className="text">{alert.show && alert.msg}</p>
          </div>
          {/*if the alert show is true, then we will show it and
         will acces and show alert msg*/}
          <button className="alert-close" onClick={hideAlert}>
            <BsFillXCircleFill color="#2f3c4e" />
          </button>
        </div>
      </div>
    </Alert1>
  );
}
const Alert1 = styled.div`
  .alert-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: none;
    z-index: 1120;
    background-size: contain;
    background-position: top;
    background: cover;
    background: #ffffff;
    -webkit-box-shadow: -1px -2px 29px 1px rgba(0, 0, 0, 0.48);
    -moz-box-shadow: -1px -2px 29px 1px rgba(0, 0, 0, 0.48);
    box-shadow: -1px -2px 29px 1px rgba(0, 0, 0, 0.48);

    width: 24rem;
    padding: 4em 1.5rem;
    text-align: center;
    color: var(--mainWhite);
    font-size: 1.2rem;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: var(--mainSpacing);
    border-radius: var(--mainBorderRadius);
    transition: all 0.3s linear;
  }
  .text {
    margin: 0rem 0rem !important;
  }
  .alert-show {
    display: block;
  }
  .alert-center {
    position: relative;
  }
  .alert p {
    margin-bottom: 0;
    line-height: 2;
  }
  .alert-danger1 {
    background: #dc3545;
  }
  .alert-close {
    color: var(--mainWhite);
    font-size: 1.5rem;
    background: transparent;
    border: none;
    display: inline-block;
    position: absolute;
    top: 0.7rem;
    right: 0.7rem;
    cursor: pointer;
    line-height: 0;
  }
`;
