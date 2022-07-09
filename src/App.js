import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login.jsx";
import Profiles from "./pages/Profiles.jsx";
import AccessCheck from "./components/AccessCheck.jsx";
import HomePage from "./pages/HomePage.jsx";
import Search from "./pages/Search.jsx";
import Watch from "./pages/Watch.jsx";
import Serie from "./pages/Serie.jsx";
const App = () => {
    return (
        <>
            {<BrowserRouter>
                <Routes>
                    <Route path="/" element={<Landing />}></Route>
                    <Route path="/login" element={<LoginPage />}></Route>
                    <Route path="/signup" element={<SignupPage />}></Route>
                    <Route path="/profiles" element={<AccessCheck> <Profiles /></AccessCheck>}></Route>
                    <Route path="/home" element={<HomePage />}></Route>
                    <Route path="/search" element={<Search />}></Route>
                    <Route path="/watch" element={<Watch />}></Route>
                    <Route path="/serie" element={<Serie />}></Route>
                    <Route path="*" element={<div className="h-screen w-full grid place-content-center font-bold text-center text-white"><p className="text-[2rem]">404</p> <p>The Page You Are Looking For Is Not Available</p></div>}></Route>
                </Routes>
            </BrowserRouter>}
        </>
    )
}

export default App;
