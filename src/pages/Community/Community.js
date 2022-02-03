import React, { useEffect, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import SpinnerV2 from "../../components/spinners/SpinnerV2";
import Spinner from "../../components/spinners/Spinner";

/*-----Constants-----*/
import { PAGES } from "../../constants/pages";

/*-----Dependencies-----*/
import { StorageService } from "../../services/storage/storage.service";

/*-----Styles-----*/
import styles from "./Community.module.css";

/*-----Components-----*/
const CommunityComponent = React.lazy(() =>
  import("../../components/Community/Community")
);
const PostComponent = React.lazy(() => import("../Post/Post"));

function Community() {
  const storage = new StorageService();
  useEffect(() => {
    storage.changePage(PAGES.COMMUNITY);
  }, []);

  return (
    <React.Fragment>
      <Routes>
        <Route
          path="/post/*"
          element={
            <Suspense fallback={<Spinner />}>
              <PostComponent />
            </Suspense>
          }
        />
        <Route
          path="/"
          element={
            <div className={styles.Post}>
              <div className={styles.Wrapper}>
                <div className={styles.Heading}>
                  <p>
                    Welcome to{" "}
                    <b style={{ color: "rgb(17,143,133)" }}>community</b> !
                  </p>
                </div>
                <Suspense fallback={<SpinnerV2 />}>
                  <CommunityComponent />
                </Suspense>
              </div>
            </div>
          }
        />
      </Routes>
    </React.Fragment>
  );
}

export default Community;
