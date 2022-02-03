import React, { useEffect, useState } from "react";
import { ACTIVITY_CONSTANTS } from "../../constants/Activity";

import { APIService } from "../../services/api/api.service";
import { StorageService } from "../../services/storage/storage.service";

import styles from "./Activity.module.css";
import User from "../../assets/img/default-user.png";
import { NavigatorService } from "../../services/navigator/navigator.service";

function Activity({ activity }) {
  const ns = new NavigatorService();
  const [action, setAction] = useState("");
  const [user, setUser] = useState({});
  const storage = new StorageService();

  useEffect(() => {
    const currentUser = storage.getUserData();
    setUser(currentUser);
    if (activity.type === ACTIVITY_CONSTANTS.CREATE_POST) {
      setAction("You created a post");
    }
    if (activity.type === ACTIVITY_CONSTANTS.COMMENT_POST) {
      setAction("You commented on the post by");
    }
    if (activity.type === ACTIVITY_CONSTANTS.LIKE_POST) {
      setAction("You liked the post by");
    }
    if (activity.type === ACTIVITY_CONSTANTS.REMOVE_LIKE_POST) {
      setAction("You removed your like from the post by");
    }
    if (activity.type === ACTIVITY_CONSTANTS.REMOVE_COMMENT_POST) {
      setAction("You removed your comment from the post by");
    }
    if (activity.type === ACTIVITY_CONSTANTS.FOLLOW_USER) {
      setAction("You followed the user ");
    }
    if (activity.type === ACTIVITY_CONSTANTS.REMOVE_FOLLOW_USER) {
      setAction("You removed your follow from the user ");
    }
    if (activity.type === ACTIVITY_CONSTANTS.UPDATE_COMMENT_POST) {
      setAction("You updated your comment on the post by");
    }
    if (activity.type === ACTIVITY_CONSTANTS.REMOVE_POST) {
      setAction("You removed your post by");
    }
  }, []);

  return (
    <div
      className={styles.Activity}
      onClick={() => ns.post(activity.postId._id)}
    >
      <img
        src={
          activity.postId.image
            ? activity.postId.image.length > 0
              ? activity.postId.image[0]
              : User
            : User
        }
        alt="user"
        style={{
          height: "40px",
          width: "40px",
          marginRight: "20px",
          borderRadius: "50%",
        }}
      />
      <p>
        {activity.type === ACTIVITY_CONSTANTS.CREATE_POST
          ? `${action}`
          : `${action} ${
              activity.postId.username === user.username
                ? "you"
                : `${activity.postId.username}`
            }`}
      </p>
    </div>
  );
}

export default Activity;
