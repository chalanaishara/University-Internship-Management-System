import { Link, useLocation } from "react-router-dom";

function Navbar() {

    const location = useLocation();

    const hideNavbar =
        location.pathname === "/login" ||
        location.pathname === "/register";

    if (hideNavbar) {
        return null;
    }

    const token = localStorage.getItem("token");

    let role = null;

    if (token) {
        try {
            const payload = JSON.parse(
                atob(token.split(".")[1])
            );

            role = payload.role;

        } catch (error) {
            console.log("Invalid token");
        }
    }

    const handleLogout = () => {

        localStorage.removeItem("token");

        window.location.href = "/login";

    };


    return (

       <nav className="fixed top-0 left-0 w-full z-40 bg-blue-600 text-white px-8 py-1">

            <div className="max-w-7xl mx-auto px-6 py-1 flex items-center justify-between">

                {/* Logo */}

                <Link
                    to="/"
                    className="text-lg font-bold"
                >
                    University Internship System
                </Link>


                {/* Navigation */}

                <div className="flex items-center gap-5 text-sm font-medium">

                    {/* Home */}

                    <Link
                        to="/"
                        className="hover:text-blue-200 transition"
                    >
                        Home
                    </Link>


                    {/* Guest */}

                    {!token && (
                        <>
                            <Link
                                to="/login"
                                className="hover:text-blue-200 transition"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="hover:text-blue-200 transition"
                            >
                                Register
                            </Link>
                        </>
                    )}


                    {/* Student */}

                    {token && role === "student" && (
                        <Link
                            to="/my-applications"
                            className="hover:text-blue-200 transition"
                        >
                            My Applications
                        </Link>
                    )}


                    {/* Company */}

                    {token && role === "company" && (
                        <>
                            <Link
                                to="/company/dashboard"
                                className="hover:text-blue-200 transition"
                            >
                                Dashboard
                            </Link>

                            <Link
                                to="/company/internships"
                                className="hover:text-blue-200 transition"
                            >
                                My Internships
                            </Link>
                        </>
                    )}


                    {/* Logout */}

                    {token && (
                        <button
                            onClick={handleLogout}
                            className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                        >
                            Logout
                        </button>
                    )}

                </div>

            </div>

        </nav>

    );
}

export default Navbar;