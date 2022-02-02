import React, { lazy, Suspense } from "react";
import SpinnerV2 from "../../components/spinners/SpinnerV2";

/*-----Styles-----*/
import styles from "./Community.module.css";

/*-----Components-----*/
const CommunityComponent = React.lazy(() =>
  import("../../components/Community/Community")
);

function Community() {
  return (
    <div className={styles.Post}>
      <div className={styles.Wrapper}>
        <div className={styles.Heading}>
          <p>
            Welcome to <b style={{ color: "rgb(17,143,133)" }}>community</b> !
          </p>
        </div>
        <Suspense fallback={<SpinnerV2 />}>
          <CommunityComponent />
        </Suspense>
      </div>
    </div>
  );
}

export default Community;
