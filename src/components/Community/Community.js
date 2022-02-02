import React, { useEffect, useState } from "react";
import SpinnerV2 from "../spinners/SpinnerV2";
import ImageViewer from "../ImageViewer/ImageViewer";

import styles from "./Community.module.css";

/*-----MUI-----*/
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";

/*-----Dependencies-----*/
import { APIService } from "../../services/api/api.service";
import { API_METHODS } from "../../constants/api";

const Card = React.lazy(() => import("./Card"));

function SkeletonComponent() {
  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ margin: 1 }}>
          <Skeleton variant="circular">
            <Avatar />
          </Skeleton>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Skeleton width="40%">
            <Typography>.</Typography>
          </Skeleton>
        </Box>
      </Box>
      <Skeleton variant="rectangular" width={{ xs: "50vw", md: "80vw" }}>
        <div style={{ paddingTop: "60%" }} />
      </Skeleton>
      <Box sx={{ marginTop: "10px" }}>
        <Skeleton width="40%">
          <Typography>.</Typography>
        </Skeleton>
      </Box>
      <Box sx={{ marginTop: "5px" }}>
        <Skeleton width="80%">
          <Typography>.</Typography>
        </Skeleton>
      </Box>
    </div>
  );
}

export default function Community() {
  const api = new APIService();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.resolve(api.call(API_METHODS.GET, "/api/posts")).then((res) => {
      console.log(res);
      if (res.error) {
        setError(true);
      } else {
        setPosts(res.data);
      }
      setLoading(false);
    });
  }, []);
  return (
    <React.Fragment>
      {loading && <SpinnerV2 />}
      {error && <div>Some Error Happened</div>}
      {posts && posts.length > 0 ? (
        posts.map((post, index) => {
          return (
            <React.Fragment key={`POST_${post._id}`}>
              <Card post={post} />
            </React.Fragment>
          );
        })
      ) : (
        <h1>There are no posts available now</h1>
      )}
      <div style={{ height: "50px" }}></div>
    </React.Fragment>
  );
}
