import React, { useEffect, useState } from "react";
import SpinnerV2 from "../../components/spinners/SpinnerV2";
import { API_METHODS } from "../../constants/api";
import { PAGES } from "../../constants/pages";
import { APIService } from "../../services/api/api.service";
import { StorageService } from "../../services/storage/storage.service";
import styles from "./Activity.module.css";

const ActivityComponent = React.lazy(() =>
  import("../../components/Activity/Activity")
);

function Activity() {
  const storage = new StorageService();
  const api = new APIService();
  const [activity, setActivity] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    storage.changePage(PAGES.ACTIVITY);
    api.call(API_METHODS.GET, "/api/activity").then((res) => {
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
              Welcome to <b style={{ color: "rgb(17,143,133)" }}>Activities</b>{" "}
              !
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
            Track all your actions in one go
          </p>
          {activity.length > 0 ? (
            activity.map((item, index) => {
              return (
                <React.Fragment key={`Activity_${index}`}>
                  <ActivityComponent activity={item} />
                </React.Fragment>
              );
            })
          ) : (
            <h1>No activity</h1>
          )}
        </div>
      )}
    </React.Fragment>
  );
}

export default Activity;
