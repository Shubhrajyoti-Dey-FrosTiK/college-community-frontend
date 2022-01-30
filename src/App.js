import React, { useState, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/*--Pages--*/
import { Spinner } from "./components/spinners/Spinner";
const LandingPage = lazy(() => import("./pages/LandingPage/LandingPage"));

export default function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/spinner" element={<Spinner />} />
          <Route
            path="/"
            element={
              <Suspense fallback={<Spinner />}>
                <LandingPage />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

// #45A29E
// #66FCF1
// #C5C6C7
// #1F2833
// #OBOC10
