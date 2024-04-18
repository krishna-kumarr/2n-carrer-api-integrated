import React, { useContext, useEffect, useRef, useState } from "react";
import Images from "../../utils/images.js";
import { MdNotificationsActive } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { IoIosCloseCircleOutline } from "react-icons/io";
import CommonContext from "../../hooks/CommonContext.jsx";

const DashboardNavbar = ({ dashboadMenus, profileImage, profileName }) => {
  const { userNavbarinfo, gettingResponse,setUserNavinfo } = useContext(CommonContext);

  const [profileResponseImage, setprofileResponseImage] = useState("");
  const [open, setOpen] = useState(false);
  let notifyRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest(".notify-closet")) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  useEffect(() => {
    if (userNavbarinfo.length > 0) {

      const image = URL.createObjectURL(
        new Blob([userNavbarinfo[0].profile_image], { type: "image/png" })
      );

      setprofileResponseImage(image);
    }

    // const getHomeDatas = async () => {
    //   const token = localStorage.getItem("Token");
    //   try {
    //     await axios
    //       .get("http://secondcareers.adraproductstudio.com:5000/professional_dashboard", {
    //         headers: {
    //           authorization: `Bearer ${token}`,
    //         },
    //       })
    //       .then((res) => {
    //         console.log(res.data);
    //         if (res.data.error_code === 0) {
    //           if (res.data.data.job_details !== undefined) {
    //             setUserNavinfo(res.data.data.user_details);
    //           }
    //         }
    //       })
    //       .catch((err) => console.log(err));
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // (async () => getHomeDatas())();
  }, [gettingResponse]);

  return (
    <div className="navbar-height placeholder-glow">
      <nav className="navbar navbar-light bg-white fixed-top navbar-expand-md shadow-sm p-2 justify-content-center ">
        <div className="container-fluid">
          <a className="navbar-brand d-flex w-50 me-auto " href="#">
            <img
              src={Images.logo}
              alt="No Logo"
              className="img-responsive logo"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsingNavbar3"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="navbar-collapse collapse w-100"
            id="collapsingNavbar3"
          >
            <ul className="navbar-nav w-100 justify-content-center">
              <li className="nav-item navigation-header-link-active">
                <NavLink
                  to="/home/all"
                  className="nav-link px-4"
                  data-testid="Home"
                >
                  {dashboadMenus[0]}
                </NavLink>
              </li>
              <li
                className="nav-item navigation-header-link-active"
                data-testid="Learning"
              >
                <NavLink
                  to="/learning"
                  className="nav-link px-4"
                  data-testid="learning"
                >
                  {dashboadMenus[1]}
                </NavLink>
              </li>
              <li
                className="nav-item navigation-header-link-active"
                data-testid="Community"
              >
                <NavLink
                  to="/community"
                  className="nav-link px-4"
                  data-testid="community"
                >
                  {dashboadMenus[2]}
                </NavLink>
              </li>
            </ul>

            <ul className="nav navbar-nav ms-auto w-100 justify-content-end align-items-center">
              <li
                className="nav-item position-relative pe-4 notify-closet"
                ref={notifyRef}
              >
                {gettingResponse === false && userNavbarinfo.length === 0 ? (
                  <span className="placeholder w-100 rounded py-2 pt-3 px-5"></span>
                ) : (
                  <>
                    <span
                      className="nav-link position-relative bell-icon notify-closet"
                      data-testid="Bell"
                      onClick={() => setOpen(!open)}
                    >
                      <MdNotificationsActive className="fs-4 notify-closet" />
                      <span className="notify-closet notification-bell-count position-absolute mt-2 top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        4
                      </span>
                    </span>

                    <div
                      className={`${
                        open
                          ? "notification-box rounded-4 shadow-lg notify-closet"
                          : "d-none"
                      }`}
                    >
                      <div className="container">
                        {/* notification header  */}
                        <div className="notification-header row align-items-center sticky-top p-3">
                          <div className="col">
                            <h6 className="m-0 fw-bold">Notification</h6>
                          </div>
                          <div className="col text-end">
                            <button className="btn btn-sm border-0">
                              clear
                            </button>
                          </div>
                        </div>

                        {/* notification body */}
                        <div className="notification-body row g-2 p-3">
                          <div className="notification-content-box p-3 rounded-4">
                            <div className="notification-content-header row align-items-center">
                              <div className="col">
                                <h5 className="m-0">Title</h5>
                              </div>
                              <div className="col text-end">
                                <button className="btn btn-sm btn-transparent border-0">
                                  <IoIosCloseCircleOutline className="fs-4" />
                                </button>
                              </div>
                            </div>

                            <div className="notification-content-text pt-2">
                              <p>
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit. Quis dignissimos mollitia
                                maxime ab itaque iste, pariatur, quas natus
                                obcaecati et esse
                              </p>
                            </div>

                            <div className="notification-content-footer text-end">
                              <span className="pe-2">2 mins ago</span>
                            </div>
                          </div>

                          <div className="notification-content-box p-3 rounded-4">
                            <div className="notification-content-header row align-items-center">
                              <div className="col">
                                <h5 className="m-0">Title</h5>
                              </div>
                              <div className="col text-end">
                                <button className="btn btn-sm btn-transparent border-0">
                                  <IoIosCloseCircleOutline className="fs-4" />
                                </button>
                              </div>
                            </div>

                            <div className="notification-content-text pt-2">
                              <p>
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit. Quis dignissimos mollitia
                                maxime ab itaque iste, pariatur, quas natus
                                obcaecati et esse
                              </p>
                            </div>

                            <div className="notification-content-footer text-end">
                              <span className="pe-2">2 mins ago</span>
                            </div>
                          </div>

                          <div className="notification-content-box p-3 rounded-4">
                            <div className="notification-content-header row align-items-center">
                              <div className="col">
                                <h5 className="m-0">Title</h5>
                              </div>
                              <div className="col text-end">
                                <button className="btn btn-sm btn-transparent border-0">
                                  <IoIosCloseCircleOutline className="fs-4" />
                                </button>
                              </div>
                            </div>

                            <div className="notification-content-text pt-2">
                              <p>
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit. Quis dignissimos mollitia
                                maxime ab itaque iste, pariatur, quas natus
                                obcaecati et esse
                              </p>
                            </div>

                            <div className="notification-content-footer text-end">
                              <span className="pe-2">2 mins ago</span>
                            </div>
                          </div>

                          <div className="notification-content-box p-3 rounded-4">
                            <div className="notification-content-header row align-items-center">
                              <div className="col">
                                <h5 className="m-0">Title</h5>
                              </div>
                              <div className="col text-end">
                                <button className="btn btn-sm btn-transparent border-0">
                                  <IoIosCloseCircleOutline className="fs-4" />
                                </button>
                              </div>
                            </div>

                            <div className="notification-content-text pt-2">
                              <p>
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit. Quis dignissimos mollitia
                                maxime ab itaque iste, pariatur, quas natus
                                obcaecati et esse
                              </p>
                            </div>

                            <div className="notification-content-footer text-end">
                              <span className="pe-2">2 mins ago</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </li>

              <li className="nav-item dropdown navbar-dropdown ">
                {gettingResponse === false && userNavbarinfo.length === 0 ? (
                  <label className=" w-100">
                    <span className="placeholder w-100 rounded py-2 pt-3 px-5"></span>
                  </label>
                ) : (
                  <>
                    <a
                      className="nav-link dropdown-toggle "
                      href="#"
                      id="navbarScrollingDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img
                        src={profileImage}
                        alt="mdo"
                        width="32"
                        height="32"
                        className="rounded-circle me-2"
                        data-testid="Profile"
                      />

                      {userNavbarinfo.length > 0
                        ? userNavbarinfo[0].first_name
                        : ""}
                      {userNavbarinfo.length > 0
                        ? userNavbarinfo[0].last_name
                        : ""}
                    </a>
                    <ul
                      className="dropdown-menu dropdown-menu-left"
                      aria-labelledby="navbarScrollingDropdown"
                      data-testid="ProfileCard"
                    >
                      <li>
                        <NavLink
                          to="/home/all/profile"
                          className="dropdown-item header-dropdown"
                          data-testid="profile"
                        >
                          My Profile
                        </NavLink>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <a className="dropdown-item header-dropdown" href="#">
                          Contact 2nd Careers
                        </a>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <NavLink
                          to="/pricing-plan"
                          className="dropdown-item header-dropdown"
                          data-testid="upgrade"
                        >
                          Upgrade
                        </NavLink>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <NavLink
                          to="/"
                          className="dropdown-item header-dropdown"
                          data-testid="logout"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default DashboardNavbar;
