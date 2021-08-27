import { css } from "styled-components";
// import { Icon, InlineIcon } from '@iconify/react';
// import abTesting from '@iconify/icons-mdi/ab-testing';

export const setColor = {
  primaryColor: "#055eb0",
  mainWhite: "#fff",
  mainBlack: "#000000",
  mainGrey: "#ececec",
  lightGrey: "#969696",
};
export const setIconColor = {
  white: `color=white'`,
  black: `color=black'`,
  red: `color=red'`,
};
export const setButtonColor = {
  white: "#fff",
  black: "#000000",
};
export const setCurreny = {
  currency: "$",
};

export const setHotelName = {
  name: "CORFU HOTEL",
};
// color:${primaryColor}
export const iconColor = {
  mainColor: "#000000",
  secondColor: "#6d6d6d",
  mainWhite: "#fff",
};

export const setIcons = {
  guests: `background: url('https://api.iconify.design/mdi:account-circle.svg?color=black') no-repeat center center / contain;`,
  wifi: `background: url('https://api.iconify.design/mdi:wifi.svg?color=black') no-repeat center center / contain;`,
  parking: `background: url('https://api.iconify.design/mdi:parking.svg?color=black') no-repeat center center / contain;`,
  kicthen: `background: url('https://api.iconify.design/ic:baseline-kitchen.svg?color=black') no-repeat center center / contain;`,
  hotWater: `background: url('https://api.iconify.design/mdi:shower-head.svg?color=black') no-repeat center center / contain;`,
  hairDryer: `background: url('https://api.iconify.design/mdi:hair-dryer.svg?color=black') no-repeat center center / contain;`,
  tv: `background: url('https://api.iconify.design/mdi:youtube-tv.svg?color=black') no-repeat center center / contain;`,
  ac: `background: url('https://api.iconify.design/mdi:air-conditioner.svg?color=black') no-repeat center center / contain;`,
  bedKing: `background: url('https://api.iconify.design/mdi:bed-king.svg?color=black') no-repeat center center / contain;`,
};
export const setFont = {
  main: "font-family: 'Gilda Display', serif;",

  slanted: "font-family: 'Roboto', sans-serif;",
};
//${setFont.main};
export const setFlex = ({ x = "center", y = "center" } = {}) => {
  return `display:flex;justify-content:${x};align-items:${y}`;
};
//display:flex; align-item:center; justify-content:center;

export const setRem = (number = 16) => {
  return `${number / 16}rem`;
};
//padding: ${setRem(60)} ${setRem(32)};

export const setLetterSpacing = (number = 2) => {
  return `letter-spacing:${number}px`;
};

//letter-spacing:`${}px`
export const setBoarder = ({
  number = "1px",
  solid = "solid",
  color = "white",
} = {}) => {
  return `border:${number} ${solid} ${color}`;
};

export const setBoxShadow = {
  fisrt: "box-shadow: 10px 10px 18px 0px rgba(0,0,0,0.75)",
  second: "box-shadow: 6px 6px 18px 0px rgba(0,0,0,0.75)",
  third: "box-shadow: 1px 1px 18px 0px rgba(0,0,0,0.1)",
};
//border: 5px solid ${setColor.primaryColor};
const sizes = {
  large: 1000,
  desktop: 800,
  tablet: 768,
  phone: 200,
  // large: 1200,
  // desktop: 800,
  // tablet: 768,
  // phone: 200,
};

// Iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `;

  return acc;
}, {});
