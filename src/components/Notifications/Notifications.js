import React, { useEffect, useState } from "react";
import { ACTIVITY_CONSTANTS } from "../../constants/Activity";

import { APIService } from "../../services/api/api.service";
import { StorageService } from "../../services/storage/storage.service";

import styles from "./Notifications.module.css";
import User from "../../assets/img/default-user.png";
import { NavigatorService } from "../../services/navigator/navigator.service";

function Notifications({ activity }) {
  const ns = new NavigatorService();
  const [action, setAction] = useState(false);
  const [user, setUser] = useState({});
  const storage = new StorageService();

  useEffect(() => {
    const currentUser = storage.getUserData();
    setUser(currentUser);
    if (activity.type === ACTIVITY_CONSTANTS.COMMENT_POST) {
      setAction("commented on your post !");
    }
    if (activity.type === ACTIVITY_CONSTANTS.LIKE_POST) {
      setAction("Liked your post !");
    }
    if (activity.type === ACTIVITY_CONSTANTS.FOLLOW_USER) {
      setAction("followed you !");
    }
  }, []);

  return (
    <div className={styles.Activity}>
      <img
        src={activity.creatorId.image || User}
        alt="user"
        style={{
          height: "40px",
          width: "40px",
          marginRight: "20px",
          borderRadius: "50%",
        }}
      />
      <div>
        <p>
          <b onClick={() => console.log("clicked")}>
            {activity.userId.username}{" "}
          </b>{" "}
        </p>
        <p onClick={() => ns.post(activity.postId._id)}>{` ${action}`}</p>
      </div>
    </div>
  );
}

export default Notifications;
