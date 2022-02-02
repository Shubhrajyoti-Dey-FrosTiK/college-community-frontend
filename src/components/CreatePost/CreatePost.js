import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Spinner from "../spinners/Spinner";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import str from "string-validator";

/*---Redux---*/
import { selectPost } from "../../redux/slices/Post";
import { useSelector } from "react-redux";

/*---Dependencies---*/
import { StorageService } from "../../services/storage/storage.service";
import { FirebaseService } from "../../services/firebase/firebase.service";
import { APIService } from "../../services/api/api.service";

/*-----Styles-----*/
import styles from "./CreatePost.module.css";

/*---Assets---*/
import Close from "../../assets/img/close.png";
import Trash from "../../assets/img/trash.png";
import Back from "../../assets/img/back.png";
import Success from "../../assets/img/success.png";
import Fail from "../../assets/img/fail.png";

/*---Constants---*/
import { API_METHODS } from "../../constants/api";

function CreatePost() {
  const fbs = new FirebaseService();
  const post = useSelector(selectPost);
  const storage = new StorageService();
  const api = new APIService();
  const [files, setFiles] = useState([]);
  const [numFiles, setNumFiles] = useState(0);
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [titleText, setTitleText] = useState("");
  const [descriptionText, setDescriptionText] = useState("");
  const [titileStatus, setTitleStatus] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [titleFocus, setTitleFocus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const FileInput = React.useRef(null);

  const handleOpen = () => storage.createPost();

  const handleClose = () => storage.cancelCreatePost();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "80vw",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #66FCF1",
    borderRadius: "30px",
    paddingTop: "20px !important",
    boxShadow: 24,
    p: 4,
  };

  const validate = (submit = false) => {
    const isEmpty = str.isNull();
    let status = true;
    if ((titleFocus || submit) && isEmpty(title)) {
      console.log("HI");
      setTitleStatus(true);
      setTitleText("Title is required");
      status = false;
    } else {
      setTitleStatus(false);
      setTitleText("");
    }
    return status;
  };

  useEffect(() => {
    validate();
    if (post.pendingImageUrl.length === numFiles && post.pendingPost) {
      const user = storage.getUserData();
      api
        .call(API_METHODS.POST, "/api/posts/", {
          headers: {
            authorization: user.token,
            username: user.username,
            userid: user.userid,
          },
          body: {
            title,
            description,
            image: post.pendingImageUrl,
          },
        })
        .then((res) => {
          console.log(res);
          setLoading(false);
          setStep(3);
          if (res.error) {
            setError(true);
          } else {
            setError(false);
          }
        });
      storage.clearPendingTasks();
    }
    console.log(post);
  });

  const AddFiles = (event) => {
    FileInput.current.click();
  };

  const RemoveFile = (index) => {
    let temp = [];
    for (let i = 0; i < files.length; i++) {
      if (i != index) {
        temp.push(files[i]);
      }
    }
    setFiles(temp);
    setNumFiles(temp.length);
  };

  const handlePost = () => {
    if (!validate(true)) {
      return;
    }
    setLoading(true);

    if (numFiles > 0) {
      fbs.uploadToFirebaseStorage(files);
    } else {
      storage.triggerPendingPost();
    }
  };

  return (
    <React.Fragment>
      {loading && <Spinner />}
      <Modal
        open={post.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              textAlign: "right",
            }}
          >
            <img
              alt="close"
              src={Close}
              onClick={handleClose}
              style={{ height: "20px", cursor: "pointer" }}
            />
          </div>
          <h1>
            Create <b style={{ color: "rgb(17,143,133)" }}>Post</b>
          </h1>
          <input
            type="file"
            id="file"
            ref={FileInput}
            multiple
            style={{ display: "none" }}
            onChange={(e) => {
              let temp = files;
              Array.from(e.target.files).forEach((file) => {
                if (file.type.includes("image")) {
                  temp.push(file);
                }
              });
              setFiles(temp);
              setNumFiles(temp.length);
            }}
          />
          {step == 1 && (
            <React.Fragment>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "20px",
                }}
              >
                <div className={styles.FileInput} onClick={AddFiles}>
                  Add Files
                </div>
                <p>Upload files of formal .png .jpg .jpeg .gif</p>
              </div>
              <div className={styles.Preview}>
                {numFiles > 0 &&
                  files.map((file, index) => (
                    <div key={`${file.name}_${index}`}>
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        style={{
                          height: "200px",
                          width: "200px",
                          objectFit: "cover",
                        }}
                      />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          paddingBottom: "10px",
                          alignItems: "center",
                        }}
                      >
                        <p>{file.name}</p>
                        <img
                          src={Trash}
                          alt="trash"
                          style={{ height: "25px", cursor: "pointer" }}
                          onClick={() => {
                            RemoveFile(index);
                          }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
              <p
                style={{
                  marginTop: "10px",
                  color: `${numFiles > 0 ? "rgb(17,143,133)" : "#FA8072"}`,
                }}
              >
                {numFiles} file{numFiles > 1 && "s"} selected
              </p>

              <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                <div
                  style={{
                    backgroundColor: "#1F2833",
                    cursor: "pointer",
                    padding: "15px",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    borderRadius: "20px",
                    color: "#66FCF1",
                  }}
                  onClick={() => {
                    setStep(2);
                  }}
                >
                  {numFiles > 0 ? "NEXT" : "SKIP PHOTOS"}
                </div>
              </div>
            </React.Fragment>
          )}
          {step == 2 && (
            <React.Fragment>
              <div>
                <p
                  style={{
                    marginTop: "10px",
                    marginBottom: "10px",
                    color: `${numFiles > 0 ? "rgb(17,143,133)" : "#FA8072"}`,
                  }}
                >
                  {numFiles} file{numFiles > 1 && "s"} selected
                </p>
              </div>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": {
                    m: 1,
                    width: "100%",
                    borderBottom: "1px solid #66FCF1",
                  },
                  "& label.Mui-focused": {
                    color: "#1f2833",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "#1f2833",
                  },
                }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "95%",
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  fullWidth
                  error={titileStatus}
                  helperText={titleText}
                  id="outlined-basic"
                  label="Title*"
                  variant="filled"
                  margin="dense"
                  onFocus={() => setTitleFocus(true)}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                  id="filled-multiline-flexible"
                  label="Description"
                  multiline
                  maxRows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  variant="filled"
                />
              </Box>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "20px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={Back}
                    alt="back"
                    onClick={() => {
                      setStep(1);
                    }}
                    style={{ cursor: "pointer" }}
                  />
                  <p
                    onClick={() => {
                      setStep(1);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    Back
                  </p>
                </div>
                <div onClick={handlePost} className={styles.POST}>
                  POST
                </div>
              </div>
            </React.Fragment>
          )}
          {step == 3 && (
            <React.Fragment>
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                {!error && <img src={Success} alt="success" height={100} />}
                {error && <img src={Fail} alt="success" height={100} />}
              </div>
              <h3
                style={{
                  textAlign: "center",
                  color: `${!error ? "rgb(17,143,133)" : "#FA8072"}`,
                  paddingTop: "20px",
                }}
              >
                {error
                  ? "Some Error Happened. Please try to login again:("
                  : "Post Created Successfully!"}
              </h3>
              <div style={{ textAlign: "center", marginTop: "30px" }}>
                <div onClick={storage.cancelCreatePost} className={styles.Done}>
                  {error ? "OK" : "DONE"}
                </div>
              </div>
            </React.Fragment>
          )}
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default CreatePost;
