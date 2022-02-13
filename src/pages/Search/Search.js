import React, { useState, useEffect, Suspense } from "react";
import { useParams } from "react-router-dom";
import SpinnerV2 from "../../components/spinners/SpinnerV2";
import { API_METHODS } from "../../constants/api";
import { APIService } from "../../services/api/api.service";
import styles from "./Search.module.css";

const SearchComponent = React.lazy(() =>
  import("../../components/Search/Search")
);

function Search() {
  const { search } = useParams();
  const api = new APIService();
  const [results, setResults] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .call(API_METHODS.GET, "/api/user/search", {
        headers: { search },
      })
      .then((res) => {
        if (res.data) {
          setResults(res.data);
        } else {
          setError(true);
        }
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.Search}>
      <div className={styles.Heading}>
        <p>
          Search <b style={{ color: "rgb(17,143,133)" }}>Users</b> !
        </p>
      </div>
      {loading && <SpinnerV2 />}
      <Suspense fallback={<SpinnerV2 />}>
        {!loading && !error && <SearchComponent results={results} />}
      </Suspense>
      {error && <h1>Some Error Happened</h1>}
    </div>
  );
}

export default Search;
