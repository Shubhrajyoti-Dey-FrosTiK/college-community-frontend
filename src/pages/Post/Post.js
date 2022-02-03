import React, { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SpinnerV2 from "../../components/spinners/SpinnerV2";
import { API_METHODS } from "../../constants/api";
import { PAGES } from "../../constants/pages";
import { APIService } from "../../services/api/api.service";
import { StorageService } from "../../services/storage/storage.service";

const PostComponent = React.lazy(() => import("../../components/Post/Post"));

function Post() {
  const { id } = useParams();
  const api = new APIService();
  const storage = new StorageService();
  const [post, setPost] = useState({});
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState({});
  const [loadingPost, setLoadingPost] = useState(true);
  const [loadingLike, setLoadingLike] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const [error, setError] = useState(false);
  const [activityId, setActivityId] = useState(null);

  useEffect(() => {
    storage.changePage(PAGES.COMMUNITY);
    api
      .call(API_METHODS.GET, "/api/posts/id", {
        headers: { postid: id },
      })
      .then((res) => {
        if (res.data) {
          setPost(res.data);
        }
        setLoadingPost(false);
      });
    api
      .call(API_METHODS.GET, "/api/posts/checkLike", {
        headers: { postid: id },
      })
      .then((res) => {
        if (res.data) {
          // const likeStatus = res.data ? true : false;
          setLiked(true);
          setActivityId(res.data._id);
        }
        setLoadingLike(false);
      });
    api
      .call(API_METHODS.GET, "/api/posts/comment", {
        headers: { postid: id },
      })
      .then((res) => {
        console.log(res);
        if (res.data) {
          setComments(res.data);
        }
        setLoadingComments(false);
      });
  }, []);

  useEffect(() => {
    if (
      Object.keys(post).length === 0 &&
      !loadingComments &&
      !loadingLike &&
      !loadingPost
    ) {
      // if (post == {}) {
      setError(true);
      console.log("Error");
    }
  });

  return (
    <React.Fragment>
      {error && <div>Some Error Happened</div>}
      {loadingPost || loadingLike || loadingComments ? (
        <SpinnerV2 />
      ) : (
        <Suspense fallback={<SpinnerV2 />}>
          <PostComponent
            post={post}
            liked={liked}
            id={activityId}
            comments={comments}
          />
        </Suspense>
      )}
    </React.Fragment>
  );
}

export default Post;
