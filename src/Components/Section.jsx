import PropTypes from "prop-types";

function Section({ className = "", children = "" }) {
  return (
    <section className={`container position-center ${className}`}>
      {children}
    </section>
  );
}

Section.propTypes = {
  className: PropTypes.string,
  children: PropTypes.string,
};

export default Section;
