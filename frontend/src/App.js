import "./App.scss";
import { Home, DetailMovies, Movies, Series, Pay } from "./pages";
import ListFilm from "../src/pages/ListFilm/ListFilm";
import AddFilm from "../src/pages/AddFilm/AddFilm";
import { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Navbar, Profile } from "../src/components";
import ListTransaction from "../src/pages/ListTransaction/ListTransaction";
import { UserContext } from "./context/userContext";
import { API, setAuthToken } from "./config/api";
import { IsAdminRoute, IsLoginRoute } from "./Privat";

function App() {
  const [state, dispatch] = useContext(UserContext);
  async function checkAuth() {
    try {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }

      const config = {
        Headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      };

      await API.get("/check-auth", config, { validateStatus: () => true })
        .then((response) => {
          const payload = response.data.data.user;
          payload.token = localStorage.token;
          console.log("ini data user", payload);
          if (!payload) {
            return dispatch({
              type: "AUTH_ERROR",
            });
          }

          dispatch({
            type: "AUTH_SUCCESS",
            payload,
          });
          console.log("ini state", state);
        })
        .catch((err) => {
          dispatch({
            type: "AUTH_ERROR",
          });
          console.log(state);
        });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (localStorage.token) {
      checkAuth();
    }
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tv-show" element={<Series />} />
        <Route path="/detail-movies/:id" element={<DetailMovies />} />
        <Route element={<IsLoginRoute />} path={"/"}>
          <Route path="/pay" element={<Pay />} />
          <Route path="/profile" element={<Profile />} />
          <Route element={<IsAdminRoute />} path={"/"}>
            <Route path="/list-film" element={<ListFilm />} />
            <Route path="/add-film" element={<AddFilm />} />
            <Route path="/list-transaction" element={<ListTransaction />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
