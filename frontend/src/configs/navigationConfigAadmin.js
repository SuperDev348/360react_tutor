import React from "react";
import * as Icon from "react-feather";

const navigationConfigAadmin = [
  {
    id: "home",
    title: "Dashboard",
    type: "item",
    icon: <Icon.Home size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/pages/HomePage",
  },
  {
    id: "virtualTour",
    title: "Virtual Tours",
    type: "item",
    icon: <Icon.Layers size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/VirtualTour",
  },
  {
    id: "maAccount",
    title: "My Account",
    type: "item",
    icon: <Icon.User size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/myacount",
  },
  // {
  //   id: "subscription",
  //   title: "Subscription",
  //   type: "item",
  //   icon: <Icon.FileText size={20} />,
  //   permissions: ["admin", "editor"],
  //   navLink: "/subscription",
  // },
  // {
  //   id: "payments",
  //   title: "Payment Methods",
  //   type: "item",
  //   icon: <Icon.CreditCard size={20} />,
  //   permissions: ["admin", "editor"],
  //   navLink: "/payments",
  // },
  // {
  //   id: "history",
  //   title: "Purchase History",
  //   type: "item",
  //   icon: <Icon.Archive size={20} />,
  //   permissions: ["admin", "editor"],
  //   navLink: "/history",
  // },
  {
    id: "faq",
    title: "Faq",
    type: "item",
    icon: <Icon.HelpCircle size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/faq",
  },
  {
    id: "contact",
    title: "Contact us",
    type: "item",
    icon: <Icon.Mail size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/contact",
  },
  {
    id: "All user",
    title: "All users",
    type: "item",
    icon: <Icon.Users size={20} />,
    // permissions: ["admin"],
    navLink: "/AllUser",
  },
  {
    id: "Add Place",
    title: "Add 360",
    type: "item",
    icon: <Icon.PlusCircle size={20} />,
    permissions: ["admin"],
    navLink: "/AddPlace",
  },
];

export default navigationConfigAadmin;
