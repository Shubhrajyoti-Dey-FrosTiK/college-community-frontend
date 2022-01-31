import React from "react";

/*--Assets--*/
import bg from "../../../assets/img/landing-background.png";
import { NavigatorService } from "../../../services/navigator/navigator.service";

/*--CSS--*/
import styles from "./CTA.module.css";

function CTA() {
  const nav = new NavigatorService();
  const borderRadius = "27px";
  return (
    <div>
      <div className={styles.BgImage}>
        <p
          style={{
            color: "#66FCF1",
            fontSize: "1.6rem",
            letterSpacing: "0.5rem",
          }}
        >
          WELCOME TO
        </p>
        <br></br>
        <p
          style={{
            color: "#66FCF1",
            fontSize: "3.8rem",
            fontFamily: "BlackChancery",
            letterSpacing: "0.3rem",
          }}
        >
          College Community
        </p>
        <br></br>
        <br></br>
        <p
          style={{
            fontSize: "1.3rem",
          }}
        >
          A Community for college students built by college students !
        </p>
        <p
          style={{
            fontSize: "1.3rem",
          }}
        >
          An open source platform developed to connect students with each other
        </p>
        <div
          style={{
            marginTop: "50px",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "30px",
          }}
        >
          <div className={styles.Button} onClick={() => nav.register()}>
            <p>REGISTER</p>
          </div>
          <div className={styles.Button} onClick={() => nav.login()}>
            <p>LOGIN</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CTA;
