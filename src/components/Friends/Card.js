import React from "react";
import User from "../../assets/img/default-user.png";
import { NavigatorService } from "../../services/navigator/navigator.service";

function Card({ activity }) {
  const ns = new NavigatorService();
  console.log(activity);
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        paddingLeft: "5vw",
        gap: "20px",
        alignItems: "center",
      }}
      onClick={() => {
        ns.user(activity.creatorId.username);
      }}
    >
      <img
        src={activity.userId.image || User}
        style={{ height: "40px", width: "40px", cursor: "pointer" }}
        alt="user"
      />

      <h2 style={{ cursor: "pointer" }}>{activity.creatorId.username}</h2>
    </div>
  );
}

export default Card;
