import React, { useState } from "react";
import styles from "./Post.module.css";
import ShowMoreText from "react-show-more-text";

/*-----MUI-----*/
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";

import ImageViewer from "../ImageViewer/ImageViewer";
import User from "../../assets/img/default-user.png";

import NotLiked from "../../assets/img/not-liked.png";
import Liked from "../../assets/img/liked.png";
import { APIService } from "../../services/api/api.service";
import { API_METHODS } from "../../constants/api";
import Spinner from "../spinners/Spinner";

import {
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  LinkedinIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

function Post({ post, liked, id, comments }) {
  const url = window.location.href;
  console.log(url);
  const api = new APIService();
  const [like, setLike] = useState(liked);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [activityId, setActivityId] = useState(id);
  const [commentList, setCommentList] = useState(comments);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLike = () => {
    if (!like) {
      api
        .call(API_METHODS.POST, "/api/posts/like", {
          headers: { postid: post._id },
          body: { postId: post._id },
        })
        .then((res) => {
          if (res.data) {
            setLike(true);
            setActivityId(res.data._id);
            setLikeCount((likeCount) => likeCount + 1);
          }
        });
    } else {
      api
        .call(API_METHODS.DELETE, "/api/posts/like/", {
          headers: { postid: post._id, activityid: activityId },
          body: {},
        })
        .then((res) => {
          console.log(res);
          if (res.data) {
            setLike(false);
            setActivityId(res.data._id);
            setLikeCount((likeCount) => likeCount - 1);
          }
        });
    }
  };

  const handleComment = () => {
    if (comment) {
      setLoading(true);
      api
        .call(API_METHODS.POST, "/api/posts/comment", {
          headers: { postid: post._id },
          body: { postId: post._id, message: comment },
        })
        .then((res) => {
          if (res.data) {
            console.log(res);
            setCommentError(false);
            setComment("");
            setCommentText("");
            setCommentList((comments) => [...comments, res.data]);
          }
          setLoading(false);
        });
    } else {
      setCommentError(true);
    }
  };

  return (
    <React.Fragment>
      {loading && <Spinner />}
      <div className={styles.Card}>
        <div className={styles.Heading}>
          <img
            src={post.userId.image || User}
            alt="user"
            style={{ height: "40px", marginRight: "20px" }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h2>{post.userId.username}</h2>
            <h5>{post.userId.name}</h5>
          </div>
        </div>
        <div style={{ marginTop: `${post.image.length ? "20px" : "0px"}` }}>
          {post.image.length > 0 && (
            <div className={styles.ImageViewer}>
              <ImageViewer images={post.image} height="100%" width="100%" />
            </div>
          )}
        </div>

        <div className={styles.Text}>
          <h1>{post.title}</h1>
          <h3>
            <ShowMoreText
              /* Default options */
              lines={3}
              more="Show more"
              less="Show less"
              className="content-css"
              anchorClass="my-anchor-css-class"
              expanded={false}
              // width={280}
              truncatedEndingComponent={"... "}
            >
              {post.description}
            </ShowMoreText>
          </h3>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "25px",
            paddingLeft: "20px",
            justifyContent: "space-between",
          }}
        >
          {like ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={handleLike}
            >
              <img
                src={Liked}
                alt="liked"
                style={{
                  height: "35px",
                  width: "35px",
                }}
              />
              <h3>
                <b>{likeCount} likes</b>
              </h3>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={handleLike}
            >
              <img
                src={NotLiked}
                alt="not liked"
                style={{ height: "35px", width: "35px" }}
              />

              <h3>
                <b>{likeCount} likes</b>
              </h3>
            </div>
          )}
          <div style={{ display: "flex", gap: "10px" }}>
            <LinkedinShareButton
              children={<LinkedinIcon round size={45} />}
              url={url}
            />
            <WhatsappShareButton
              children={<WhatsappIcon round size={45} />}
              url={url}
            />
            <TelegramShareButton
              children={<TelegramIcon round size={45} />}
              url={url}
            />
            <TwitterShareButton
              children={<TwitterIcon round size={45} />}
              url={url}
            />
          </div>
        </div>
        <div style={{ marginTop: "20px" }}>
          <h1 style={{ color: "rgb(17,143,133)" }}>
            {comments.length} Comment{comments.length === 1 ? "" : "s"}
          </h1>
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
              width: "100%",
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="filled-multiline-flexible"
              label="Comment"
              multiline
              maxRows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              variant="filled"
            />
          </Box>
          <div style={{ textAlign: "right" }}>
            <div className={styles.Comment} onClick={handleComment}>
              COMMENT
            </div>
          </div>
        </div>
        {commentList.length > 0 &&
          commentList.map((comment, index) => {
            return (
              <div
                className={`${styles.Heading} ${styles.Comments}`}
                key={`Comment_${index}`}
              >
                <img
                  src={post.userId.image || User}
                  alt="user"
                  style={{ height: "40px", marginRight: "10px" }}
                />
                <div
                  style={{
                    borderLeft: "2px solid rgb(17,143,133)",
                    paddingLeft: "10px",
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <h2>{post.userId.username}</h2>
                  <h3>
                    <ShowMoreText
                      /* Default options */
                      lines={3}
                      more="Show more"
                      less="Show less"
                      className="content-css"
                      anchorClass="my-anchor-css-class"
                      expanded={false}
                      // width={280}
                      truncatedEndingComponent={"... "}
                    >
                      {comment.message}
                    </ShowMoreText>
                  </h3>
                </div>
              </div>
            );
          })}
      </div>
    </React.Fragment>
  );
}

export default Post;
