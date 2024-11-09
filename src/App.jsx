import Home from "./pages/Home";
import { useEffect } from "react";
import { useAuthContext } from "./store/AuthContext";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ClientDetails from "./pages/ClientDetails";
import Client from "./pages/Client";
import EngineerDetails from "./pages/EngineerDetails";
import Engineer from "./pages/Engineer";
import Dashboard from "./pages/Dashboard";

function App() {
  const [user, setUser] = useAuthContext();

  useEffect(() => {
    localStorage.setItem("admin", JSON.stringify(user));
    console.log(user);
  }, [user]);

  const handleLogin = (token, name, email, id) => {
    const newUser = {
      id: id,
      email: email,
      name: name,
      token: token,
      isUserLoggedIn: true,
    };
    setUser({ ...newUser });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          
          path="/"
          element={ user.isUserLoggedIn ? (<Home />) : ( <Navigate to="/login" replace:true /> ) }>

            
        <Route index  element={user.isUserLoggedIn ? (<Dashboard/>):(<Navigate to="/login" replace:true />)}/>

        <Route  path="/clientdetails" element={user.isUserLoggedIn ? (<ClientDetails />) : ( <Navigate to="/login" replace:true /> )}  />

        <Route  path="/client" element={user.isUserLoggedIn ? (<Client />) : ( <Navigate to="/login" replace:true /> )}  />

        <Route  path="/engineerdetails" element={user.isUserLoggedIn ? (  <EngineerDetails /> ) : ( <Navigate to="/login" replace:true /> )} />

        
        <Route  path="/engineer" element={user.isUserLoggedIn ? (  <Engineer /> ) : ( <Navigate to="/login" replace:true /> )} />

                      
          </Route>

        <Route
          path="/login"
          element={
            !user.isUserLoggedIn ? (
              <Login
                handleLogin={handleLogin}
                isUserLoggedIn={user.isUserLoggedIn}
              />
            ) : (
              <Navigate to="/" replace:true />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
