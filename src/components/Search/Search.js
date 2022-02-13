import React from "react";
import Card from "./Card";

import styles from "./Search.module.css";

function Search({ results }) {
  console.log(results);
  return (
    <React.Fragment>
      <div className={styles.Content}>
        {results && results.length ? (
          results.map((result, index) => {
            return (
              <React.Fragment key={index}>
                <Card user={result} />
              </React.Fragment>
            );
          })
        ) : (
          <h1>No Results Found</h1>
        )}
      </div>
    </React.Fragment>
  );
}

export default Search;
