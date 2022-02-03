import React, { useState } from "react";
import ShowMoreText from "react-show-more-text";
import styles from "./Card.module.css";
import User from "../../assets/img/default-user.png";
import ImageViewer from "../ImageViewer/ImageViewer";
import { Link } from "react-router-dom";
import { NavigatorService } from "../../services/navigator/navigator.service";

function Card({ post }) {
  const [count, setCount] = useState(500);
  const ns = new NavigatorService();
  const handleClick = () => {
    ns.post(post._id);
  };
  return (
    <div className={styles.Card} onClick={handleClick}>
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
        {post.image.length > 0 && <ImageViewer images={post.image} />}
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
    </div>
  );
}

export default Card;
