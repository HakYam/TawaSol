import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Fragment, useEffect } from "react";
import Landing from "./components/Landing";
import "./App.css";
import Navbar from "./components/Navbar";
import store from "./redux/store";
import { Provider } from "react-redux";
import Register from "./components/Users/Register";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Alert from "./components/Alert";
import Login from "./components/Users/Login";
import Home from "./components/Home";
import Private from "./components/PrivateRoute";
import ProfileForm from "./components/ProfileForms/ProfileFrom";
import AddEducation from "./components/ProfileForms/AddEducation";
import AddExperience from "./components/ProfileForms/AddExperience";
import Developers from "./components/Developers";
import { setAuthToken } from "./utils";
import { loadUser } from "./redux/modules/users";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import Posts from "./components/Posts/Posts";
import Post from "./components/Posts/Post";

const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <>
          <ToastContainer />
          <Alert />
          <Navbar />
          <Routes>
            <Route  path="/" element={<Landing />} />
            <Route  path="/register" element={<Register />} />
            <Route  path="/login" element={<Login />} />
            <Route element={<Private />}>
              <Route  path="/home" element={<Home />} />
              <Route  path="/create-profile" element={<ProfileForm />} />
              <Route  path="/add-education" element={<AddEducation />} />
              <Route  path="/add-experience" element={<AddExperience />} />
              <Route  path="/developers" element={<Developers />} />
              <Route  path="/profile/:id" element={<Profile />} />
              <Route  path="/settings" element={<Settings />} />
              <Route  path="/edit-profile" element={<ProfileForm />} />
              <Route  path="/posts" element={<Posts />} />
              <Route  path="/posts/:id" element={<Post />} />
            </Route>
          </Routes>
        </>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
