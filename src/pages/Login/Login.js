import React, { Suspense } from "react";

/*--Styles--*/
import styles from "./Login.module.css";

/*--Components--*/
import Spinner from "../../components/spinners/Spinner";
const LoginComponent = React.lazy(() => import("../../components/Login/Login"));
const ImageBanner = React.lazy(() =>
  import("../../components/Register/ImageBanner")
);

const Login = () => {
  return (
    <React.Fragment>
      <div className={styles.Register}>
        <Suspense fallback={<Spinner />}>
          <LoginComponent />
          <ImageBanner />
        </Suspense>
      </div>
    </React.Fragment>
  );
};

export default Login;
