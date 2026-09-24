import {BrowserRouter,Routes,Route} from "react-router-dom";

import Home from "../pages/Home.jsx";
import Register from "../pages/Register.jsx";
import Login from "../pages/Login.jsx";
import Navbar from "./components/navbar.jsx";
import InternshipDetails from "../pages/InternshipDetails.jsx";
import MyApplications from "../pages/MyApplications.jsx";
import Applicants from "../pages/Applicants.jsx";
import CompanyDashboard from "../pages/CompanyDashboard.jsx";
import AddInternship from "../pages/AddInternship.jsx";
import MyInternships from "../pages/MyInternships.jsx";
import EditInternship from "../pages/EditInternships.jsx";

function App() {
    return (
        <BrowserRouter>
        <h1 className="text-3xl font-bold underline text-center my-4 text-blue-600">
            <Navbar title="University Internship System" />
        </h1>   
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

                <Route
                    path="/my-applications"
                    element={<MyApplications/>}
                />

                <Route
                    path="/applicants/:internshipId"
                    element={<Applicants/>}
                />

                <Route
                    path="/company/dashboard"
                    element={<CompanyDashboard/>}
                />

                <Route
                    path="/company/add-internship"
                    element={<AddInternship />}
                />
                
                <Route
                    path="/company/internships"
                    element={<MyInternships />}
                />

                <Route
                    path="/company/internships/edit/:id"
                    element={<EditInternship />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;