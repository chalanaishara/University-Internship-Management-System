import {BrowserRouter,Routes,Route} from "react-router-dom";

import Home from "../pages/Home.jsx";
import Register from "../pages/Register.jsx";
import Login from "../pages/Login.jsx";
import Navbar from "./components/navbar.jsx";

function App() {
    return (
        <BrowserRouter>
            <Navbar title="University Internship System" />

             <Routes>

                <Route
                    path="/"
                    element={<Home/>}
                />

                <Route
                    path="/login"
                    element={<Login/>}
                />

                <Route
                    path="/register"
                    element={<Register/>}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;