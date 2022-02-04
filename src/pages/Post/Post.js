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
  const [post, setPost] = useState(null);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState({});
  const [loadingPost, setLoadingPost] = useState(true);
  const [loadingLike, setLoadingLike] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const [error, setError] = useState(false);
  const [activityId, setActivityId] = useState(null);

  useEffect(() => {
    storage.changePage(PAGES.COMMUNITY);
    console.log(id);
    api
      .call(API_METHODS.GET, "/api/posts/id", {
        headers: { postid: id },
      })
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          setPost(res.data);
        } else {
          setError(true);
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
        if (res.data) {
          setComments(res.data);
        } else {
          setError(true);
        }
        setLoadingComments(false);
      });
  }, []);

  useEffect(() => {
    if (!post && !loadingComments && !loadingLike && !loadingPost) {
      // if (post == {}) {
      setError(true);
      console.log("Error");
    }
    console.log(post);
  });

  return (
    <React.Fragment>
      {error && (
        <div>
          <h2 style={{ textAlign: "center", marginTop: "30px" }}>
            Post Not Found{" "}
          </h2>
        </div>
      )}
      {loadingPost || loadingLike || (loadingComments && <SpinnerV2 />)}
      {!loadingPost && !loadingLike && !loadingComments && !error && (
        <React.Fragment>
          <Suspense fallback={<SpinnerV2 />}>
            <PostComponent
              post={post}
              liked={liked}
              id={activityId}
              comments={comments}
            />
          </Suspense>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default Post;
