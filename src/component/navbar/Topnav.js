import React from "react";

// images
import Card1 from "../../assets/images/card.jpeg";
import Card2 from "../../assets/images/card2.jpg";

// routing
import { Link } from "react-router-dom";

// alert
import { warning } from "../../util/Alert";

// jquery
import $ from "jquery";

// redux
import { useDispatch, useSelector } from "react-redux";

// types
import { UNSET_ADMIN } from "../../store/admin/types";

//serverpath
import { baseURL } from "../../util/Config";
import { connect } from "react-redux";

import {getProfile} from "../../store/admin/action"
import { useEffect } from "react";

const Topnav = (props) => {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin.admin);

  useEffect(() => {
    props.getProfile()
  },[])

  const handleDrawer = () => {
    $(".profile-drop-menu").toggleClass("show");
  };

  const closePopup = () => {
    $("body").removeClass("activity-sidebar-show");
  };

  const handleLogout = () => {
    const data = warning();
    data.then((isLogout) => {
      if (isLogout) {
        dispatch({ type: UNSET_ADMIN });
        window.location.href = "/";
      }
    });
  };

  return (
    <>
      <div className="page-header">
        <nav className="navbar navbar-expand-lg d-flex justify-content-between">
          <div className="header-title flex-fill">
            <a href={() => false} id="sidebar-toggle">
              <i data-feather="arrow-left"></i>
            </a>
          </div>
          <div className="flex-fill" id="headerNav">
            <ul className="navbar-nav">
              {/* <li className="nav-item">
                <a
                  className="nav-link activity-trigger"
                  href={() => false}
                  id="activity-sidebar-toggle"
                >
                  <i data-feather="grid"></i>
                </a>
              </li> */}
              <li className="nav-item dropdown mb-2" onClick={handleDrawer}>
                <a
                  className="nav-link profile-dropdown"
                  href={() => false}
                  id="profileDropDown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={admin?.image ? baseURL+admin?.image : Card1}
                    alt=""
                    style={{ width: "30px", height: "30px" }}
                  />
                </a>
                <div
                  className="dropdown-menu dropdown-menu-end profile-drop-menu"
                  aria-labelledby="profileDropDown"
                  style={{ right: 0, left: "auto" }}
                >
                  <Link
                    className="dropdown-item"
                    to="/admin/profile"
                    onClick={handleDrawer}
                  >
                    <i data-feather="user"></i>Profile
                  </Link>
                  {/* <a className="dropdown-item" href={() => false}>
                    <i data-feather="inbox"></i>Messages
                  </a>
                  <a className="dropdown-item" href={() => false}>
                    <i data-feather="edit"></i>Activities
                    <span className="badge rounded-pill bg-success">12</span>
                  </a>
                  <a className="dropdown-item" href={() => false}>
                    <i data-feather="check-circle"></i>Tasks
                  </a> */}
                  <div className="dropdown-divider"></div>
                  <Link
                    className="dropdown-item"
                    to="/admin/setting"
                    onClick={handleDrawer}
                  >
                    <i data-feather="settings"></i>Settings
                  </Link>
                  {/* <a className="dropdown-item" href={() => false}>
                    <i data-feather="unlock"></i>Lock
                  </a> */}
                  <a
                    href={() => false}
                    className="dropdown-item"
                    onClick={handleLogout}
                  >
                    <i data-feather="log-out"></i>Logout
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div className="activity-sidebar-overlay"></div>
      {/* <div className="activity-sidebar">
        <span id="activity-sidebar-close" onClick={closePopup}>
          <i className="material-icons">close</i>
        </span>
        <div className="activity-header">
          <h5>Activity Logs</h5>
        </div>
        <div className="activity-body">
          <ul className="activity-list list-unstyled">
            <li className="activity-item">
              <div className="activity-icon">
                <i className="material-icons">add</i>
              </div>
              <div className="activity-text">
                Ann Green uploaded new item
                <span>
                  This item has to be reviewed, moderators will check it soon.
                </span>
              </div>
              <div className="activity-helper">45min ago</div>
            </li>
            <li className="activity-item activity-info">
              <div className="activity-icon">
                <i className="material-icons">code</i>
              </div>
              <div className="activity-text">
                John Doe made changes to create-invoice.js
                <span>
                  57 lines of code added, 0 removals, 0 errors, 6 warnings
                </span>
              </div>
              <div className="activity-helper">3h ago</div>
            </li>
            <li className="activity-item activity-danger">
              <div className="activity-icon">
                <i className="material-icons">error_outline</i>
              </div>
              <div className="activity-text">
                Can't retrieve data from server
                <span>Server is not responding, please contact provider</span>
              </div>
              <div className="activity-helper">6h ago</div>
            </li>
            <li className="activity-item">
              <div className="activity-icon">
                <i className="material-icons">done</i>
              </div>
              <div className="activity-text">
                Files Uploaded
                <span>2 new files uploaded</span>
                <div className="mail-attachment-files">
                  <div className="card">
                    <img src={Card1} className="card-img-top" alt="..." />
                    <div className="card-body">
                      <h5 className="card-title">image.jpg</h5>
                      <p className="card-text text-secondary">305 KB</p>
                    </div>
                  </div>
                  <div className="card">
                    <img src={Card2} className="card-img-top" alt="..." />
                    <div className="card-body">
                      <h5 className="card-title">image2.jpg</h5>
                      <p className="card-text text-secondary">400 KB</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="activity-helper">8h ago</div>
            </li>
          </ul>
        </div>
      </div> */}
    </>
  );
};

export default connect(null ,{getProfile})(Topnav);
