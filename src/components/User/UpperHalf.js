import React, { useEffect, useState } from "react";
import styles from "./UpperHalf.module.css";

import Spinner from "../../components/spinners/Spinner";

import User from "../../assets/img/default-user.png";

import { API_METHODS } from "../../constants/api";

import { StorageService } from "../../services/storage/storage.service";
import { APIService } from "../../services/api/api.service";

function UpperHalf({ user }) {
  const storage = new StorageService();
  const api = new APIService();
  const currentUser = storage.getUserData();
  const [following, setFollowing] = useState(null);
  const [loadingFollowing, setLoadingFollowing] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    api
      .call(API_METHODS.GET, `/api/activity/follow`, {
        headers: { creatorId: user._id },
        body: {
          creatorId: user._id,
        },
      })
      .then((res) => {
        if (res.data) {
          setFollowing(res.data.follow);
        } else {
          setError(true);
        }
        setLoadingFollowing(false);
      });
  }, []);

  const follow = () => {
    setLoading(true);
    api
      .call(API_METHODS.POST, `/api/activity/follow`, {
        headers: {},
        body: {
          creatorId: user._id,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data) {
          setFollowing(true);
        } else {
          setError(true);
        }
        setLoading(false);
      });
  };

  const unfollow = () => {
    setLoading(true);
    api
      .call(API_METHODS.POST, `/api/activity/unfollow`, {
        headers: {},
        body: {
          creatorId: user._id,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data) {
          setFollowing(false);
        } else {
          setError(true);
        }
        setLoading(false);
      });
  };

  return (
    <React.Fragment>
      <div className={styles.UpperHalf}>
        <img src={user.image || User} alt="user" className={styles.Avatar} />
        <div className={styles.Names}>
          <h1>{user.username}</h1>
          <h2>{user.name}</h2>
          <h3>{user.bio}</h3>
          {user._id !== currentUser.userid && !loadingFollowing && !following && (
            <div className={styles.Follow} onClick={follow}>
              FOLLOW
            </div>
          )}
          {user._id !== currentUser.userid && !loadingFollowing && following && (
            <div className={styles.Unfollow} onClick={unfollow}>
              Following
            </div>
          )}
        </div>
      </div>
      {loading && <Spinner />}
    </React.Fragment>
  );
}

export default UpperHalf;
