import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import Loading from "./components/Loading";

function App() {
  const user = JSON.parse(localStorage.getItem("user") as string) || null;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLogged, setIsLogged] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(false);
    if (user) {
      const decodedToken: any = jwtDecode(user?.accessToken);

      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("user");
        window.location.href = "/";
        setIsLogged(false);
      }

      setIsLogged(true);
    } else {
      setIsLogged(false);
    }

    console.log(user);
  }, [user, isLoading]);

  if (isLoading) return <Loading />;
  else {
    return (
      <div className="bg-[#121212] h-screen max-h-screen text-white ">
        {isLogged ? (
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        )}
      </div>
    );
  }
}

export default App;
