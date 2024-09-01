import PropTypes from "prop-types";

function Section({ className = "", children = "" }) {
  return <section className={`container ${className}`}>{children}</section>;
}

Section.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Section;
