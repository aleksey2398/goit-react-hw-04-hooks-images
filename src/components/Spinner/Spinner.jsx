import Loader from "react-loader-spinner";
import React from "react";

const Spinner = () => {
  return (
    <Loader
      type="Circles"
      color="#00BFFF"
      height={300}
      width={300}
      timeout={3000}
    />
  );
};

export default Spinner;