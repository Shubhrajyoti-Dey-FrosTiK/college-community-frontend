import React, { useState } from "react";
import Box from "@mui/material/Box";

import styles from "./SideNav.module.css";

/*---- Dependencies ----*/
import { StorageService } from "../../services/storage/storage.service";

/*---- Redux ----*/
import { selectPage } from "../../redux/slices/Page";
import { useSelector } from "react-redux";
import { NavigatorService } from "../../services/navigator/navigator.service";

function SideNav() {
  const page = useSelector(selectPage);
  const ns = new NavigatorService();
  const storage = new StorageService();
  const selectedBackgroundColor = "#1F2833";
  const [options, setOptions] = useState([
    "Posts",
    "Likes",
    "Activity",
    "Notifications",
  ]);

  const handleClick = (page) => {
    storage.changePage(page);
    switch (page) {
      case "Post":
        ns.post();
        break;
      case "Likes":
        ns.likes();
        break;
      case "Activity":
        ns.activity();
        break;
      case "Notifications":
        ns.notifications();
        break;
      default:
        ns.post();
    }
  };
  return (
    <div className={styles.SideNav}>
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <div
          className={styles.CreatePost}
          style={{ cursor: "pointer" }}
          onClick={() => {
            storage.createPost();
          }}
        >
          {" "}
          <b>+ CREATE POST</b>
        </div>
        {options.map((option) => {
          return (
            <div
              className={styles.Options}
              key={`Page_${option}`}
              onClick={() => handleClick(option)}
              style={{
                backgroundColor: `${
                  option === page.page ? selectedBackgroundColor : ""
                }`,
                color: `${
                  option === page.page ? "white" : selectedBackgroundColor
                }`,
              }}
            >
              <p>{option}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SideNav;
