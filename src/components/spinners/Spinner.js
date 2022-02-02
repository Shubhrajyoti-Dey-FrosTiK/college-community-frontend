import React, { useState } from "react";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/react";

export const Spinner = (props) => {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");
  const override = css`
    position: relative;
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
          zIndex: "2500",
          // height: "100px",
          // width: "100px",
          // top: "50%",
          // left: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100vh",
          width: "100vw",
          backgroundColor: `${
            props.light ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.6)"
          }`,
          // marginLeft: " -50px",
          // marginTop: "-50px",
          backgroundSize: "100%",
        }}
      >
        <RingLoader
          loading={true}
          color={`${props.light ? "#66fcf1" : "#003366"}`}
          size={70}
        />
        <h3
          style={{
            // marginTop: "100px",
            textAlign: "center",
            paddingLeft: "5px",
            color: `${props.light ? "white" : "#003366"}`,
            marginTop: "30px",
          }}
        >
          Loading....
        </h3>
      </div>
    </React.Fragment>
  );
};

export default Spinner;
