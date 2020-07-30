import React from "react";
import Menu from "./Menu";
import "../styles.css";
import PropTypes from 'prop-types';

const Layout = ({ // set default props
  title = "Title",
  description = "Description",
  className,
  children,
}) => {
  return (
    <div>
      <Menu />
      <div className="jumbotron">
        <h2>{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
  );
};

export default Layout;

Layout.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string
}
