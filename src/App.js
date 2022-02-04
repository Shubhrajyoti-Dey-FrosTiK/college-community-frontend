import React, { useState, lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

/*-----Redux-----*/
import { selectUser, update } from "./redux/slices/User";

/*---Dependencies---*/
import { StorageService } from "./services/storage/storage.service";

/*--Pages--*/
import Spinner from "./components/spinners/Spinner";
import { TopNav, BottomNav } from "./components/Navbar/Navbar";
const LandingPage = lazy(() => import("./pages/LandingPage/LandingPage"));
const Register = lazy(() => import("./pages/Register/Register"));
const Login = lazy(() => import("./pages/Login/Login"));
const Home = lazy(() => import("./pages/Home/Home"));

export default function App() {
  const storage = new StorageService();
  const user = useSelector(selectUser);
  console.log(user);
  return (
    <React.Fragment>
      <BrowserRouter>
        {!user.username && !user.token && !user.userid ? (
          <Routes>
            <Route
              path="/register"
              element={
                <Suspense fallback={<Spinner />}>
                  <Register />
                </Suspense>
              }
            />
            <Route
              path="/login"
              element={
                <Suspense fallback={<Spinner />}>
                  <Login />
                </Suspense>
              }
            />
            <Route
              path="/"
              element={
                <Suspense fallback={<Spinner />}>
                  <LandingPage />
                </Suspense>
              }
            />
          </Routes>
        ) : (
          <React.Fragment>
            <TopNav />
            <Routes>
              <Route
                path="/*"
                element={
                  <Suspense fallback={<Spinner />}>
                    <Home />
                  </Suspense>
                }
              />
            </Routes>
            <BottomNav />
          </React.Fragment>
        )}
      </BrowserRouter>
    </React.Fragment>
  );
}

// #45A29E
// #66FCF1
// #C5C6C7
// #1F2833
// #OBOC10
// rgb(17,143,133)
