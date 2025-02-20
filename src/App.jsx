import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Header } from "./components";
import { AddPost, Auth, Diaries, DiaryUpdate, Home, Profile } from "./pages";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authActions } from "./store";

function App() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.isLogin);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(authActions.login());
    }
  }, [dispatch]);
  return (
    <div>
      <header>
        <Header />
      </header>
      <section>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/diaries" element={<Diaries />} />
          <Route path="/auth" element={<Auth />} />

          {isLogin && (
            <>
              <Route path="/profile" element={<Profile />} />
              <Route path="/add-post" element={<AddPost />} />
              <Route path="/post/:id" element={<DiaryUpdate />} />{" "}
            </>
          )}
        </Routes>
      </section>
      <ToastContainer />
    </div>
  );
}

export default App;
