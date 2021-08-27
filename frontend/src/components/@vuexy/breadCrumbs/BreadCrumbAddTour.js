// import React from "react";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   UncontrolledButtonDropdown,
//   DropdownMenu,
//   DropdownItem,
//   DropdownToggle,
// } from "reactstrap";
// import { Home, Settings } from "react-feather";
// import { NavLink } from "react-router-dom";
// class BreadCrumbs extends React.Component {
//   render() {
//     return (
//       <div className="content-header row ">
//         <div className="content-header-left ">
//           {/* <hr style={{ backgroundColor: "#0ca8fd" }} /> */}

//           <div className="row breadcrumbs-top">
//             <div className="col-12">
//               hhh
//               <div className="breadcrumb-wrapper vx-breadcrumbs d-sm-block d-none col-12">
//                 <Breadcrumb tag="ol">
//                   <BreadcrumbItem tag="li">
//                     <NavLink to="/VirtualTour">
//                       <Home className="align-top" size={20} />
//                     </NavLink>
//                   </BreadcrumbItem>
//                   <BreadcrumbItem tag="li" className="text-primary">
//                     {this.props.breadCrumbParent}
//                   </BreadcrumbItem>
//                   {this.props.breadCrumbParent2 ? (
//                     <BreadcrumbItem tag="li" className="text-primary">
//                       {this.props.breadCrumbParent2}
//                     </BreadcrumbItem>
//                   ) : (
//                     ""
//                   )}
//                   {this.props.breadCrumbParent3 ? (
//                     <BreadcrumbItem tag="li" className="text-primary">
//                       {this.props.breadCrumbParent3}
//                     </BreadcrumbItem>
//                   ) : (
//                     ""
//                   )}
//                   <BreadcrumbItem tag="li" active>
//                     {this.props.breadCrumbActive}
//                   </BreadcrumbItem>
//                 </Breadcrumb>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
// export default BreadCrumbs;

import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import { Home, Settings, PlusCircle } from "react-feather";
import { NavLink } from "react-router-dom";

class BreadCrumbs extends React.Component {
  navigateToPage = () => {
    this.context.router.push("/AddPlace");
  };
  render() {
    return (
      <div className="content-header row">
        <div className="content-header-left col-md-9 col-12 mb-2">
          <div className="row breadcrumbs-top">
            <div className="breadcrumb-wrapper vx-breadcrumbs d-sm-block d-none col-12">
              <Breadcrumb tag="ol">
                <BreadcrumbItem tag="li">
                  <NavLink to="/pages/HomePage">
                    <Home className="align-top" size={20} />
                  </NavLink>
                </BreadcrumbItem>
                <BreadcrumbItem tag="li" className="text-primary">
                  {this.props.breadCrumbParent}
                </BreadcrumbItem>
                {this.props.breadCrumbParent2 ? (
                  <BreadcrumbItem tag="li" className="text-primary">
                    {this.props.breadCrumbParent2}
                  </BreadcrumbItem>
                ) : (
                  ""
                )}
                {this.props.breadCrumbParent3 ? (
                  <BreadcrumbItem tag="li" className="text-primary">
                    {this.props.breadCrumbParent3}
                  </BreadcrumbItem>
                ) : (
                  ""
                )}
                <BreadcrumbItem tag="li" active>
                  {this.props.breadCrumbActive}
                </BreadcrumbItem>
              </Breadcrumb>
            </div>
          </div>
        </div>

        <div className="content-header-right text-md-right col-md-3 col-12 d-md-block d-none">
          <div className="form-group breadcrum-right dropdown">
            <UncontrolledButtonDropdown>
            <NavLink to="/AddPlace">

              <DropdownToggle
                color="primary"
                size="sm"
                className="btn-icon btn-round dropdown-toggle"
              >
                <PlusCircle
                  size={14}
                  style={{
                    left: 0,
                  }}
                >
                  <NavLink to="/VirtualTour">
                    <Home className="align-top" size={20} />
                  </NavLink>
                </PlusCircle>
              </DropdownToggle>
              </NavLink>

            </UncontrolledButtonDropdown>
          </div>
        </div>
      </div>
    );
  }
}
export default BreadCrumbs;
