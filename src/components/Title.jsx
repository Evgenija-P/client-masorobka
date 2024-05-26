/* eslint-disable react/display-name */
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { forwardRef } from "react";

export const Title = forwardRef(({ type, children, tClass }, ref) => {
  return (
    <h2
      ref={ref}
      className={`w-fit text-4xl font-bold ${
        type === "white" ? "text-txt-main-white" : "text-txt-main-black"
      } ${tClass}`}
    >
      {children}
    </h2>
  );
});

Title.propTypes = {
  children: PropTypes.node.isRequired,
  tClass: PropTypes.string,
  type: PropTypes.oneOf(["white", "black"]).isRequired,
};

export const MTitle = motion(Title);
