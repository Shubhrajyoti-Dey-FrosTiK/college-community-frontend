import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import str from "string-validator";

/*------Assets------*/
import logo from "../../assets/img/logo-light.png";
import back from "../../assets/img/back-light.png";

/*------Styles------*/
import styles from "./Login.module.css";

/*------Dependencies------*/
import { NavigatorService } from "../../services/navigator/navigator.service";
import { APIService } from "../../services/api/api.service";
import { API_METHODS } from "../../constants/api";

function Register() {
  const ns = new NavigatorService();
  const api = new APIService();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [emailStatus, setEmailStatus] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [serverResponse, setServerResponse] = useState();
  const [lastEmail, setLastEmail] = useState();

  const validate = (submit = false) => {
    console.log(submit);
    const isEmpty = str.isNull();
    const isEmail = str.isEmail();
    let status = true;

    if ((emailFocus || submit) && (isEmpty(email) || !isEmail(email))) {
      status = false;
      setEmailStatus(true);
      setEmailText("It must be a valid email");
    } else {
      setEmailStatus(false);
      setEmailText("");
    }
    if ((passwordFocus || submit) && isEmpty(password)) {
      status = false;
      setPasswordStatus(true);
      setPasswordText("Password is required");
    } else {
      setPasswordStatus(false);
      setPasswordText("");
    }

    if (serverResponse && !serverResponse.data) {
      status = false;

      if (
        serverResponse.message === "Email already exists" &&
        email === lastEmail
      ) {
        status = false;
        setEmailStatus(true);
        setEmailText("Email already exists");
      } else {
        status = true;
        setEmailStatus(false);
        setEmailText("");
      }
    }
    return status;
  };

  useEffect(() => {
    validate();
  });

  const handleSubmit = () => {
    const val = validate(true);
    if (val) {
      // api
      //   .call(API_METHODS.POST, "/api/user", {
      //     headers: {},
      //     body: {
      //       email,
      //       username: userName,
      //       password,
      //       name,
      //     },
      //   })
      // .then((res) => {
      //   setServerResponse(res);
      //   setLastEmail(email);
      // });
    } else {
      console.log("Some Error Happened");
    }
  };

  return (
    <div className={styles.Login}>
      <div className={styles.Back}>
        <img
          src={back}
          alt="back"
          onClick={() => ns.home()}
          style={{ cursor: "pointer" }}
        />
        <p onClick={() => ns.back()} style={{ cursor: "pointer" }}>
          Back
        </p>
      </div>
      <div className={styles.RegisterBody}>
        <img src={logo} alt="logo" style={{ width: "200px" }} />
        <h2 style={{ marginTop: "30px", color: "#66fcf1" }}>
          Glad to see you back !!
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginLeft: "-7px",
          }}
        >
          <Box
            component="form"
            sx={{
              input: { color: "white" },
              "& > :not(style)": {
                m: 1,
                width: "100%",
                color: "white",
              },
              "& label": {
                color: "white",
              },
              "& label.Mui-focused": {
                color: "white",
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "#66fcf1",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#66fcf1",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#66fcf1",
                },
                "&.MuiFormHelperText-root.Mui-error": {
                  // color: "#66fcf1",
                },
              },
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              width: "80%",
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              fullWidth
              error={emailStatus}
              helperText={emailText}
              id="outlined-basic"
              label="Email Id"
              variant="outlined"
              margin="dense"
              value={email}
              onFocus={() => setEmailFocus(true)}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              error={passwordStatus}
              helperText={passwordText}
              id="outlined-basic"
              label="Password"
              variant="outlined"
              margin="dense"
              onFocus={() => setPasswordFocus(true)}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
        </div>
        <div onClick={handleSubmit} className={styles.Button}>
          LOGIN
        </div>
        <h2 style={{ color: "white" }}>OR</h2>
        <div onClick={() => ns.register()} className={styles.Register}>
          CREATE ACCOUNT
        </div>
      </div>
      <div style={{ height: "20px" }}></div>
    </div>
  );
}

export default Register;
