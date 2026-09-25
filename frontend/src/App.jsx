import { BrowserRouter, Routes, Route } from "react-router-dom";

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
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>

            <h1 className="text-3xl font-bold underline text-center my-4 text-blue-600">
                <Navbar title="University Internship System" />
            </h1>

            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/internship/:id"
                    element={
                    <ProtectedRoute role="student">
                    <InternshipDetails />
                    </ProtectedRoute>
                    }
                />

                {/* Protected Student Route */}
                <Route
                    path="/my-applications"
                    element={
                        <ProtectedRoute role="student">
                            <MyApplications />
                        </ProtectedRoute>
                    }
                />

               <Route
                    path="/applicants/:internshipId"
                    element={
                    <ProtectedRoute role="company">
                    <Applicants />
                    </ProtectedRoute>
                    }
                />

                <Route
                    path="/company/dashboard"
                    element={
                    <ProtectedRoute role="company">
                    <CompanyDashboard />
                    </ProtectedRoute>
                    }
                />

                <Route
                    path="/company/add-internship"
                    element={
                    <ProtectedRoute role="company">
                    <AddInternship />
                    </ProtectedRoute>
                    }
                />

                <Route
                    path="/company/internships"
                    element={
                    <ProtectedRoute role="company">
                    <MyInternships />
                    </ProtectedRoute>
                    }
                />

                <Route
                    path="/company/internships/edit/:id"
                    element={
                    <ProtectedRoute role="company">
                    <EditInternship />
                    </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;