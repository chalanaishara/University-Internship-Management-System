import {BrowserRouter,Routes,Route} from "react-router-dom";

import Home from "../pages/Home.jsx";
import Register from "../pages/Register.jsx";
import Login from "../pages/Login.jsx";
import Navbar from "./components/navbar.jsx";
import InternshipDetails from "../pages/InternshipDetails.jsx";

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

                <Route
                    path="/internship/:id"
                    element={<InternshipDetails/>}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;