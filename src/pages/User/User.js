import React, { Suspense, useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Community from "../../components/Community/Community";
import SpinnerV2 from "../../components/spinners/SpinnerV2";

/*-----Constants-----*/
import { API_METHODS } from "../../constants/api";

/*-----Dependencies-----*/
import { APIService } from "../../services/api/api.service";

/*-----Styles-----*/
import styles from "./User.module.css";

const UpperComponent = React.lazy(() =>
  import("../../components/User/UpperHalf")
);

function User() {
  const api = new APIService();
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [posts, setPosts] = useState(null);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    api
      .call(API_METHODS.GET, "/api/user", {
        headers: {
          username: username,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data) {
          setUser(res.data);
        } else {
          setError("User not found");
        }
        setLoadingUser(false);
      });

    api
      .call(API_METHODS.GET, "/api/posts/user", {
        headers: {
          username: username,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data) {
          setPosts(res.data);
        } else {
          setError("Cant find posts");
        }
        setLoadingPosts(false);
      });
  }, [username]);

  return (
    <React.Fragment>
      {(loadingUser || loadingPosts) && <SpinnerV2 />}
      {!loadingUser && !loadingPosts && user && (
        <div className={styles.User}>
          <Suspense fallback={<SpinnerV2 />}>
            <UpperComponent user={user} />
            <div className={styles.Community}>
              <h1 className={styles.Heading}>Posts</h1>
              <Community postData={posts} />
            </div>
          </Suspense>
        </div>
      )}
      {!loadingUser && !loadingPosts && error && <h1>{error}</h1>}
    </React.Fragment>
  );
}

export default User;
