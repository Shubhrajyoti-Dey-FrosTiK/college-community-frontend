import React, { useState } from "react";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/react";

export const Spinner = () => {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");
  const override = css`
    position: absolute;
    height: 100px;
    width: 100px;
    top: 50%;
    left: 50%;
    margin-left: -50px;
    margin-top: -50px;
    background-size: 100%;
  `;
  return (
    <React.Fragment>
      <div
        style={{
          position: "absolute",
          height: "100px",
          width: "100px",
          top: "50%",
          left: "50%",
          marginLeft: " -50px",
          marginTop: "-50px",
          backgroundSize: "100%",
        }}
      >
        <RingLoader loading={true} color={"#003366"} size={70} />
        <h3
          style={{
            marginTop: "100px",
            textAlign: "center",
            paddingLeft: "-5px",
            color: "#003366",
          }}
        >
          Loading..
        </h3>
      </div>
    </React.Fragment>
  );
};
