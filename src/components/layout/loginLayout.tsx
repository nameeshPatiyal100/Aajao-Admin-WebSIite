import * as React from "react";

import { Link } from "react-router-dom";
// import Header from "./Header";
// import loginImage from '../../assets/hotel.jpg';
type LayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const animations = {
  initial: { opacity: 0, x: -1000 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 300 },
};

export const LoginLayout = ({ children, title }: LayoutProps) => (
  <>
    {/* <Header /> */}
    <div
      className="d-flex relative w-100 login-layout"
      style={{ height: "100vh" }}
    >
      <div className=" login-left">
        <div className="logo-login-pg">
          <Link to="/auth/login">
            {/* <img width="200" src={logo} alt="Workflow" /> */}
          </Link>
        </div>
        <div className="d-flex flex-column lgn-left-col  justify-content-center">
          <div>
            {title === "Login" && (
              <div className="login-logo-box">
                <div className="logo-login-pg">
                  {/* <Link to="/auth/login">
                  <img width="200" src={logo} alt="Workflow" />
                </Link> */}
                </div>
                {/* <Typography sx={{ textAlign: "center" }}>Welcome Back!</Typography> */}
                <h2
                  className="f-40 mb-0 semi-bold"
                  style={{ paddingBottom: "40px" }}
                >
                  Login
                </h2>
              </div>
            )}
          </div>

          <div>{children}</div>
        </div>
      </div>
      {/* <div className="login-right d-flex justify-content-center align-items-center">
        <img src={loginImage} alt="Workflow" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div> */}
    </div>
  </>
);
