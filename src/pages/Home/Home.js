import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

/*-----Components-----*/
import SpinnerV2 from "../../components/spinners/SpinnerV2";

/*----Dependencies----*/
import { NavigatorService } from "../../services/navigator/navigator.service";
import { StorageService } from "../../services/storage/storage.service";

import styles from "./Home.module.css";

const SideNav = React.lazy(() => import("../../components/Home/SideNav"));
const Community = React.lazy(() => import("../Community/Community"));

function Home() {
  const ns = new NavigatorService();
  const storage = new StorageService();
  return (
    <React.Fragment>
      <div className={styles.Home}>
        <div className={styles.SideNav}>
          <SideNav />
        </div>
        <div className={styles.Content}>
          <Routes>
            <Route
              path="/community"
              element={
                <Suspense fallback={<SpinnerV2 />}>
                  <Community />
                </Suspense>
              }
            />
            <Route
              path="/friends"
              element={<h1 style={{ fontSize: "100px" }}>Friends</h1>}
            />
            <Route
              path="/activity"
              element={<h1 style={{ fontSize: "100px" }}>Activity</h1>}
            />
            <Route
              path="/notifications"
              element={<h1 style={{ fontSize: "100px" }}>Notifications</h1>}
            />
            <Route
              path="*"
              element={
                <Suspense fallback={<SpinnerV2 />}>
                  <Community />
                </Suspense>
              }
            />
          </Routes>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
