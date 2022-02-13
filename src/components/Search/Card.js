import React from "react";

import styles from "./Card.module.css";
import User from "../../assets/img/default-user.png";
import { NavigatorService } from "../../services/navigator/navigator.service";

function Card({ user }) {
  const ns = new NavigatorService();
  return (
    <div
      className={styles.Card}
      onClick={() => {
        ns.user(user.username);
      }}
    >
      <img
        src={`${user.avatar || User}`}
        alt="avatar"
        className={styles.Avatar}
      />
      <h1 className={styles.Username}>{user.username}</h1>
      <h3>{user.name}</h3>
    </div>
  );
}

export default Card;
