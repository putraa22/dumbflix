import "./App.scss";
import {  Home, DetailSeries, DetailMovies, Movies, Series,  Pay } from "./pages";
import ListFilm from "../src/pages/ListFilm/ListFilm";
import AddFilm from "../src/pages/AddFilm/AddFilm";
import { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Navbar, Profile } from "../src/components";
import DetailFilm from "./pages/DetailFilm/DetailFilmAdmin";
import ListTransaction from "../src/pages/ListTransaction/ListTransaction";
import { UserContext } from "./context/userContext";
import { API, setAuthToken } from './config/api';
import { IsAdminRoute, IsLoginRoute } from "./Privat";
import { ResetTvOutlined } from "@mui/icons-material";

// if(localStorage.token) {
//   setAuthToken(localStorage.token);
// }


function App() {
  // let navigate = useNavigate()
  // const [state, dispatch] = useContext(UserContext);
  // // const [isLogin, setIsLogin] = useState(false);
  // console.log(state);

  // useEffect(() => {
  //   if (localStorage.token){
  //     setAuthToken(localStorage.token)
  //   }

  //   if(state.isLogin == false){
  //     navigate('/')
  //   } else {
  //     if (state.user.status === "costumer") {
  //       navigate('/')
  //     } else if(state.user.status === "admin") {
  //       navigate('/list-film')
  //     }
  //   }    
  // }, [state])

  // let checkAuth = async () => {
  //   try{
  //     const response = await API.get("/check-auth")
  //     console.log(response)

  //     if(response.status === 404){
  //       return dispatch({
  //         type: "AUTH_ERROR"
  //       })
  //     }
      
  //     let payload = response.data.data.user
  //     payload.token = localStorage.token

  //     dispatch({
  //       type: "USER_SUCCESS",
  //       payload,
  //     })
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // useEffect(() => {
  //   if (localStorage.token) {
  //     checkAuth()
  //   }
  // }, [])

  const [state, dispatch] = useContext(UserContext)
  async function checkAuth() {
    try{
      if (localStorage.token) {
        setAuthToken(localStorage.token)
      }

    const  config = {
        Headers: {
          Authorization: `Bearer ${localStorage.token}`
        }
      }

      await API.get("/check-auth", config, {validateStatus: () => true }).then(response => {
        const payload = response.data.data.user
        payload.token = localStorage.token
        console.log("ini data user", payload);
        if (!payload) {
          return dispatch({
            type: "AUTH_ERROR"
          })
        }

        dispatch({
          type: "AUTH_SUCCESS",
          payload
        })
        console.log("ini state", state);
      }).catch(err => {
        dispatch({
          type: 'AUTH_ERROR'
        })
        console.log(state);
      })
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (localStorage.token) {
      checkAuth()
    }
  }, [])


  return (
      <div className="App">
        <Navbar  />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tv-show" element={<Series />} />
          <Route path="/detail-series" element={<DetailSeries />} />
          <Route path="/detail-movies" element={<DetailMovies />} />
          <Route element={<IsLoginRoute />} path={"/"} >
          <Route path="/pay" element={<Pay />} />
          <Route path="/profile" element={<Profile />} />
            <Route element={<IsAdminRoute />} path={"/"} >
              <Route path="/list-film" element={<ListFilm />} />
              <Route path="/add-film" element={<AddFilm />} />
              <Route path="/detail-film" element={<DetailFilm />} />
              <Route path="/list-transaction" element={<ListTransaction />} />
            </Route>
          </Route>
        </Routes>
      </div>
  );
}

export default App;
