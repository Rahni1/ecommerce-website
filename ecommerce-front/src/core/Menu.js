import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";
import { Icon } from 'semantic-ui-react'

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff7315" };
  } else {
    return { color: "#ffffff" };
  }
};

const Menu = ({ history }) => {
  return (
    <div>
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
          <Link className="nav-link" style={isActive(history, "/")} to="/">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(history, "/shop")}
            to="/shop"
          >
            Shop
          </Link>
        </li>

        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/user/dashboard")}
              to="/user/dashboard"
            >
              My Account
            </Link>
          </li>
        )}

        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/admin/dashboard")}
              to="/admin/dashboard"
            >
              Dashboard
            </Link>
          </li>
        )}

        {!isAuthenticated() && (
          <Fragment>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/signin")}
                to="/signin"
              >
                Signin
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/signup")}
                to="/signup"
              >
                Signup
              </Link>
            </li>
          </Fragment>
        )}

        {isAuthenticated() && (
          <li className="nav-item">
            <span
              className="nav-link"
              style={{ cursor: "pointer", color: "#ffffff" }}
              onClick={() =>
                signout(() => {
                  history.push("/");
                })
              }
            >
              Signout
            </span>
          </li>
        )}

        <li className="nav-item cart-icon">
        <Link
          className="nav-link"
          style={isActive(history, "/cart")}
          to="/cart"
        >
        <Icon name='shopping cart'/>{" "}
          <sup>
            <small className="cart-badge">{itemTotal()}</small>
          </sup>
        </Link>
      </li>
      </ul>
    </div>
  );
};

export default withRouter(Menu);
