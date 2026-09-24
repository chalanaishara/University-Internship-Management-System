
import { Link } from "react-router-dom";

function Navbar() {

    return (

        <nav className="bg-blue-600 text-white px-8 py-4">

            <div className="max-w-7xl mx-auto flex items-center justify-between">

                <Link
                    to="/"
                    className="text-lg font-bold"
                >
                    University Internship System
                </Link>

                <div className="flex gap-6">

                    <Link
                        to="/"
                        className="text-base hover:text-gray-200"
                    >
                        Home
                    </Link>

                    <Link
                        to="/login"
                        className="text-base hover:text-gray-200"
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="text-base hover:text-gray-200"
                    >
                        Register
                    </Link>

                    <Link
                        to="/my-applications"
                        className="text-base hover:text-gray-200"
                    >
                        My Applications
                    </Link>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;


