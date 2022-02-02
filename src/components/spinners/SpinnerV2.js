import React from "react";
import { GridLoader } from "react-spinners";

function SpinnerV2(props) {
  return (
    <div
      style={{
        width: "100%",
        height: "calc(100%)",
        // marginTop: "65px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <GridLoader
        loading={true}
        color={`${props.light ? "#66fcf1" : "#003366"}`}
        size={30}
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
        Content Incoming !
      </h3>
    </div>
  );
}

export default SpinnerV2;
