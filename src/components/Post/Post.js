import React, { useState } from "react";
import styles from "./Post.module.css";
import { InlineShareButtons } from "sharethis-reactjs";

import ShowMoreText from "react-show-more-text";
import User from "../../assets/img/default-user.png";
import ImageViewer from "../ImageViewer/ImageViewer";

import NotLiked from "../../assets/img/not-liked.png";
import Liked from "../../assets/img/liked.png";
import { APIService } from "../../services/api/api.service";
import { API_METHODS } from "../../constants/api";

function Post({ post, liked, id }) {
  const api = new APIService();
  const [like, setLike] = useState(liked);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [activityId, setActivityId] = useState(id);

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

  console.log(post);
  return (
    <React.Fragment>
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
          <h2>{post.title}</h2>
          <h4>
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
          </h4>
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
          <InlineShareButtons
            config={{
              alignment: "center", // alignment of buttons (left, center, right)
              color: "white", // set the color of buttons (social, white)
              enabled: true, // show/hide buttons (true, false)
              font_size: 16, // font size for the buttons
              labels: "cta", // button labels (cta, counts, null)
              language: "en", // which language to use (see LANGUAGES)
              networks: [
                // which networks to include (see SHARING NETWORKS)
                "whatsapp",
                "linkedin",
                "messenger",
                "facebook",
                "twitter",
              ],
              padding: 12, // padding within buttons (INTEGER)
              radius: 4, // the corner radius on each button (INTEGER)
              // show_total: true,
              size: 40, // the size of each button (INTEGER)

              // OPTIONAL PARAMETERS
              // url: "http://localhost:3000/post/61faeba5b8081910b0c74b14", // (defaults to current url)
              // image: "https://bit.ly/2CMhCMC", // (defaults to og:image or twitter:image)
              // description: "custom text", // (defaults to og:description or twitter:description)
              // title: "custom title", // (defaults to og:title or twitter:title)
              // message: "custom email text", // (only for email sharing)
              // subject: "custom email subject", // (only for email sharing)
              // username: "custom twitter handle", // (only for twitter sharing)
            }}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Post;
