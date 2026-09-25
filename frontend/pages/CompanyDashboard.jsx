import { Link } from "react-router-dom";

function CompanyDashboard() {

    return (
        <div className="min-h-screen bg-gray-100 p-8">

            <div className="max-w-6xl mx-auto">

                <h1 className="text-3xl font-bold mb-2">
                    Company Dashboard
                </h1>

                <p className="text-gray-600 mb-8">
                    Manage your internship opportunities and applicants.
                </p>


                <div className="grid md:grid-cols-3 gap-6">


                    {/* Add Internship */}

                    <div className="bg-white p-6 rounded-xl shadow">

                        <h2 className="text-xl font-semibold mb-3">
                            Add Internship
                        </h2>

                        <p className="text-gray-600 mb-5">
                            Create a new internship opportunity.
                        </p>

                        <Link
                            to="/company/add-internship"
                            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        >
                            Add Internship
                        </Link>

                    </div>


                    {/* My Internships */}

                    <div className="bg-white p-6 rounded-xl shadow">

                        <h2 className="text-xl font-semibold mb-3">
                            My Internships
                        </h2>

                        <p className="text-gray-600 mb-5">
                            View and manage your internships.
                        </p>

                        <Link
                            to="/company/internships"
                            className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                        >
                            My Internships
                        </Link>

                    </div>


                    {/* Applicants */}

                    <div className="bg-white p-6 rounded-xl shadow">

                        <h2 className="text-xl font-semibold mb-3">
                            Applicants
                        </h2>

                        <p className="text-gray-600 mb-5">
                            Select an internship to view its applicants.
                        </p>

                        <Link
                            to="/company/internships"
                            className="inline-block bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                        >
                            View Applicants
                        </Link>

                    </div>


                </div>

            </div>

        </div>
    );
}

export default CompanyDashboard;