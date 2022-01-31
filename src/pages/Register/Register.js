import React, { Suspense } from "react";

/*--Styles--*/
import styles from "./Register.module.css";

/*--Components--*/
import Spinner from "../../components/spinners/Spinner";
const RegisterComponent = React.lazy(() =>
  import("../../components/Register/Register")
);
const ImageBanner = React.lazy(() =>
  import("../../components/Register/ImageBanner")
);

const Register = () => {
  return (
    <React.Fragment>
      <div className={styles.Register}>
        <Suspense fallback={<Spinner />}>
          <RegisterComponent />
          <ImageBanner />
        </Suspense>
      </div>
    </React.Fragment>
  );
};

export default Register;
