import React, { useState, lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

/*-----Redux-----*/
import { selectUser, update } from "./redux/slices/User";

/*---Dependencies---*/
import { StorageService } from "./services/storage/storage.service";

/*--Pages--*/
import Spinner from "./components/spinners/Spinner";
const LandingPage = lazy(() => import("./pages/LandingPage/LandingPage"));
const Register = lazy(() => import("./pages/Register/Register"));
const Login = lazy(() => import("./pages/Login/Login"));
const Home = lazy(() => import("./pages/Home/Home"));

export default function App() {
  const storage = new StorageService();
  const user = useSelector(selectUser);
  // const [user, setUser] = useState(storage.getUserData());
  const [lastUserDetails, setLastUserDetails] = useState({
    username: null,
    userid: null,
    token: null,
  });

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
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<Spinner />}>
                  <Home />
                </Suspense>
              }
            />
          </Routes>
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
