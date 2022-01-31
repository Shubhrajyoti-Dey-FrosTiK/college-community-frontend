import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import str from "string-validator";

/*------Assets------*/
import logo from "../../assets/img/logo-dark.png";
import back from "../../assets/img/back.png";

/*------Styles------*/
import styles from "./Register.module.css";

/*------Dependencies------*/
import { NavigatorService } from "../../services/navigator/navigator.service";

function Register() {
  const ns = new NavigatorService();
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [nameText, setNameText] = useState("");
  const [userNameText, setUserNameText] = useState("");
  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [cPasswordText, setCPasswordText] = useState("");
  const [nameStatus, setNameStatus] = useState(false);
  const [userNameStatus, setUserNameStatus] = useState(false);
  const [emailStatus, setEmailStatus] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState(false);
  const [cPasswordStatus, setCPasswordStatus] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);
  const [userNameFocus, setUserNameFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [cPasswordFocus, setCPasswordFocus] = useState(false);

  const validate = () => {
    const isEmpty = str.isNull();
    const isEmail = str.isEmail();
    let status = true;
    if (nameFocus && isEmpty(name)) {
      status = false;
      setNameStatus(true);
      setNameText("Name is required");
    } else {
      setNameStatus(false);
      setNameText("");
    }
    if (emailFocus && (isEmpty(email) || !isEmail(email))) {
      status = false;
      setEmailStatus(true);
      setEmailText("It must be a valid email");
    } else {
      setEmailStatus(false);
      setEmailText("");
    }
    if (passwordFocus && isEmpty(password)) {
      status = false;
      setPasswordStatus(true);
      setPasswordText("Password is required");
    } else {
      setPasswordStatus(false);
      setPasswordText("");
    }
    if (cPasswordFocus && isEmpty(cPassword)) {
      status = false;
      setCPasswordStatus(true);
      setCPasswordText("Confirm Password is required");
    } else {
      setCPasswordStatus(false);
      setCPasswordText("");
    }
    if (cPasswordFocus && cPassword !== password) {
      status = false;
      setCPasswordStatus(true);
      setCPasswordText("Password does not match");
    } else {
      setCPasswordStatus(false);
      setCPasswordText("");
    }
  };
  useEffect(() => {
    validate();
  });

  return (
    <div className={styles.Register}>
      <div className={styles.Back}>
        <img
          src={back}
          alt="back"
          onClick={() => ns.home()}
          style={{ cursor: "pointer" }}
        />
        <p onClick={() => ns.home()} style={{ cursor: "pointer" }}>
          Back
        </p>
      </div>
      <div className={styles.RegisterBody}>
        <img src={logo} alt="logo" style={{ width: "200px" }} />
        <h2 style={{ marginTop: "30px" }}>Lets get started !!</h2>
        <div
          style={{ display: "flex", justifyContent: "center", width: "400px" }}
        >
          <Box
            component="form"
            sx={{
              "& > :not(style)": {
                m: 1,
                width: "100%",
              },
              "& label.Mui-focused": {
                color: "#1f2833",
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "#1f2833",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#1f2833",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#66fcf1",
                },
                "&.MuiFormHelperText-root.Mui-error": {
                  color: "#66fcf1",
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
              error={nameStatus}
              helperText={nameText}
              id="outlined-basic"
              label="Name"
              variant="outlined"
              margin="dense"
              onFocus={() => setNameFocus(true)}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
            <TextField
              fullWidth
              error={cPasswordStatus}
              helperText={cPasswordText}
              id="outlined-basic"
              label="Confirm Password"
              variant="outlined"
              margin="dense"
              onFocus={() => setCPasswordFocus(true)}
              value={cPassword}
              onChange={(e) => setCPassword(e.target.value)}
            />
            <TextField
              fullWidth
              error={userNameStatus}
              helperText={userNameText}
              id="outlined-basic"
              label="Username"
              variant="outlined"
              margin="dense"
              onFocus={() => setUserNameFocus(true)}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </Box>
        </div>
        <button className={styles.Button}>CHECK USERNAME AVAILABILITY</button>
        <h2>OR</h2>
        <div className={styles.Login}>LOGIN</div>
      </div>
      <div style={{ height: "20px" }}></div>
    </div>
  );
}

export default Register;
