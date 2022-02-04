import React, { useEffect, useState } from "react";
import Card from "../../components/Friends/Card";
import SpinnerV2 from "../../components/spinners/SpinnerV2";
import { API_METHODS } from "../../constants/api";
import { PAGES } from "../../constants/pages";
import { APIService } from "../../services/api/api.service";
import { StorageService } from "../../services/storage/storage.service";
import styles from "./Friends.module.css";

const ActivityComponent = React.lazy(() =>
  import("../../components/Activity/Activity")
);

function Friends() {
  const storage = new StorageService();
  const api = new APIService();
  const [activity, setActivity] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    storage.changePage(PAGES.FRIENDS);
    api.call(API_METHODS.GET, "/api/activity/following").then((res) => {
      console.log(res);
      if (res.data) {
        setActivity(res.data);
      }
      setLoading(false);
      setError(true);
    });
  }, []);

  return (
    <React.Fragment>
      {loading && <SpinnerV2 />}
      {!loading && (
        <div className={styles.Activity}>
          <div className={styles.Heading}>
            <p>
              See who you <b style={{ color: "rgb(17,143,133)" }}>Follow</b> !
            </p>
          </div>
          <p
            style={{
              fontSize: "1ren",
              textAlign: "left",
              width: "100%",
              paddingLeft: "5vw",
              marginBottom: "20px",
            }}
          >
            Have a list of all your followings !
          </p>
          {activity.length > 0 ? (
            activity.map((item, index) => {
              return (
                <React.Fragment key={`Activity_${index}`}>
                  <Card activity={item} />
                </React.Fragment>
              );
            })
          ) : (
            <h1>No Friends</h1>
          )}
        </div>
      )}
    </React.Fragment>
  );
}

export default Friends;
