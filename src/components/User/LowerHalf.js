import React from "react";
import Card from "../Community/Card";

function LowerHalf({ posts }) {
  return (
    <div>
      {posts &&
        posts.length > 0 &&
        posts.map((post, index) => {
          return (
            <React.Fragment key={`POST_${post._id}`}>
              <Card post={post} />
            </React.Fragment>
          );
        })}{" "}
    </div>
  );
}

export default LowerHalf;
