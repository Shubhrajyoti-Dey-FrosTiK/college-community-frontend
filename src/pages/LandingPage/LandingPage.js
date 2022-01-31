import React from "react";

/*--Components--*/
const CTA = React.lazy(() => import("../../components/LandingPage/CTA/CTA"));

const LandingPage = () => {
  return (
    <React.Fragment>
      <CTA />
    </React.Fragment>
  );
};

export default LandingPage;
