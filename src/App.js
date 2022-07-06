import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing.jsx";
import SignupPage from "./components/Signup";
import LoginPage from "./components/Login.jsx";
import Profiles from "./components/Profiles.jsx";
import AccessCheck from "./components/AccessCheck.jsx";
const App = () => {
    return (
        <>
            {<BrowserRouter>
                <Routes>
                    <Route path="/" element={<Landing />}></Route>
                    <Route path="/login" element={<LoginPage />}></Route>
                    <Route path="/signup" element={<SignupPage />}></Route>
                    <Route path="/profiles" element={<AccessCheck> <Profiles /></AccessCheck>}></Route>
                    {/* <Route path="/loader" element={<Loader />}></Route> */}
                </Routes>
            </BrowserRouter>}
        </>
    )
}

export default App;
