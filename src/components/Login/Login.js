import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import str from "string-validator";
import { createTheme, ThemeProvider } from "@mui/material";
import { useDispatch } from "react-redux";
import { Spinner } from "../../components/spinners/Spinner";

/*------Assets------*/
import logo from "../../assets/img/logo-light.png";
import back from "../../assets/img/back-light.png";

/*------Styles------*/
import styles from "./Login.module.css";

/*------Redux------*/
import { updateUser } from "../../redux/slices/User";

/*------Dependencies------*/
import { NavigatorService } from "../../services/navigator/navigator.service";
import { APIService } from "../../services/api/api.service";
import { API_METHODS, API_RESPONSE_MESSAGES } from "../../constants/api";
import { StorageService } from "../../services/storage/storage.service";

function Login() {
  const ns = new NavigatorService();
  const api = new APIService();
  const storage = new StorageService();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameText, setUsernameText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [usernameStatus, setUsernameStatus] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [serverResponse, setServerResponse] = useState();
  const [lastUsername, setLastUsername] = useState();
  const [statusText, setStatusText] = useState("");
  const [loading, setLoading] = useState(false);

  const theme = createTheme({
    status: {
      danger: "#e53e3e",
    },
    palette: {
      primary: {
        main: "#0971f1",
        darker: "#053e85",
      },
      neutral: {
        main: "#64748B",
        contrastText: "#fff",
      },
      error: {
        main: "#FA8072",
      },
    },
  });

  const validate = (submit = false) => {
    const isEmpty = str.isNull();
    let status = true;

    if ((usernameFocus || submit) && isEmpty(username)) {
      status = false;
      setUsernameStatus(true);
      setUsernameText("It must be a valid email");
    } else {
      setUsernameStatus(false);
      setUsernameText("");
    }
    if ((passwordFocus || submit) && isEmpty(password)) {
      status = false;
      setPasswordStatus(true);
      setPasswordText("Password is required");
    } else {
      setPasswordStatus(false);
      setPasswordText("");
    }

    return status;
  };

  useEffect(() => {
    validate();
  });

  const handleSubmit = () => {
    const val = validate(true);
    if (val) {
      setLoading(true);
      api
        .call(API_METHODS.POST, "/api/user/login", {
          headers: {},
          body: {
            username,
            password,
          },
        })
        .then((res) => {
          setLoading(false);
          console.log(res);
          if (!res.data) {
            setStatusText("Invalid username or password");
          } else {
            const newUser = {
              username: res.data.username,
              userid: res.data._id,
              token: res.token,
            };
            storage.storUserData(newUser);
            ns.home();
          }
          setServerResponse(res);
          setLastUsername(username);
        });
    } else {
      console.log("Some Error Happened");
    }
  };

  return (
    <React.Fragment>
      {loading && <Spinner light />}
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
            <ThemeProvider theme={theme}>
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
                    "& helperText-root.Mui-error": {
                      color: "#FA8072",
                    },
                  },
                }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "80%",
                }}
                // theme={theme}
                noValidate
                autoComplete="off"
              >
                <TextField
                  fullWidth
                  error={usernameStatus}
                  helperText={usernameText}
                  id="outlined-basic"
                  label="Username"
                  variant="outlined"
                  margin="dense"
                  value={username}
                  onFocus={() => setUsernameFocus(true)}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setStatusText("");
                  }}
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
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setStatusText("");
                  }}
                />
              </Box>
            </ThemeProvider>
          </div>
          <p style={{ color: "#FA8072" }}>{statusText}</p>
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
    </React.Fragment>
  );
}

export default Login;
