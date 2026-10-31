
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Applicants() {

    const [internships, setInternships] = useState([]);
    const [applications, setApplications] = useState([]);

    const [loading, setLoading] = useState(true);
    const [showApplicants, setShowApplicants] = useState(false);

    const [selectedInternship, setSelectedInternship] = useState(null);
    const [updatingId, setUpdatingId] = useState(null);


    // Fetch company's internships
    useEffect(() => {

        const fetchInternships = async () => {

            const token = localStorage.getItem("token");

            try {

              const response = await axios.get(
    "http://localhost:5000/api/internships/my",
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
);

                setInternships(response.data);

            } catch (error) {

                console.log(error);

                toast.error("Failed to load internships");

            } finally {

                setLoading(false);

            }
        };

        fetchInternships();

    }, []);


    // View applicants for selected internship
    const handleViewApplicants = async (internship) => {

        const token = localStorage.getItem("token");

        try {

            setSelectedInternship(internship);
            setApplications([]);
            setShowApplicants(true);

           const response = await axios.get(
    `http://localhost:5000/api/applications/internship/${internship._id}`,
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
);

            const data = response.data;

            setApplications(
                Array.isArray(data)
                    ? data
                    : data.applications || []
            );

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to load applicants"
            );

        }
    };


    // Update application status
    const updateStatus = async (applicationId, status) => {

        const token = localStorage.getItem("token");

        try {

            setUpdatingId(applicationId);

            const response = await axios.put(
                `http://localhost:5000/api/applications/${applicationId}/status`,
                {
                    status: status
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setApplications(prev =>
                prev.map(application =>
                    application._id === applicationId
                        ? {
                            ...application,
                            status:
                                response.data.application?.status || status
                        }
                        : application
                )
            );

            toast.success(
                status === "selected"
                    ? "Applicant selected successfully"
                    : "Applicant rejected successfully"
            );

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to update application status"
            );

        } finally {

            setUpdatingId(null);

        }
    };


    // Back to internship list
    const handleBack = () => {

        setShowApplicants(false);
        setSelectedInternship(null);
        setApplications([]);

    };


    if (loading) {

        return (
            <div className="min-h-screen flex justify-center items-center">
                Loading internships...
            </div>
        );

    }


    return (

        <div className="min-h-screen bg-gray-100 p-8">

            <div className="max-w-6xl mx-auto">

                <h1 className="text-3xl font-bold mb-2">
                    Applicants
                </h1>

                <p className="text-gray-600 mb-8">
                    Manage students who applied for your internships.
                </p>


                {/* Internship List */}
                {!showApplicants && (

                    <div className="grid gap-6">

                        {internships.length === 0 ? (

                            <div className="bg-white p-8 rounded-xl shadow text-center">

                                <h2 className="text-xl font-semibold mb-2">
                                    No Internships Found
                                </h2>

                                <p className="text-gray-500">
                                    You haven't added any internships yet.
                                </p>

                            </div>

                        ) : (

                            internships.map(internship => (

                                <div
                                    key={internship._id}
                                    className="bg-white p-6 rounded-xl shadow"
                                >

                                    <h2 className="text-xl font-semibold mb-3">
                                        {internship.title}
                                    </h2>

                                    <p className="text-gray-600">
                                        Company: {internship.company}
                                    </p>

                                    <p className="text-gray-600 mb-5">
                                        Location: {internship.location}
                                    </p>


                                    {/* View Applicants */}
                                    <button
                                        onClick={() =>
                                            handleViewApplicants(internship)
                                        }
                                        className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700"
                                    >
                                        View Applicants
                                    </button>

                                </div>

                            ))

                        )}

                    </div>

                )}


                {/* Selected Internship Applicants */}
                {showApplicants && (

                    <div>

                        <button
                            onClick={handleBack}
                            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 mb-6"
                        >
                            Back to Internships
                        </button>


                        <div className="bg-white p-6 rounded-xl shadow mb-6">

                            <h2 className="text-2xl font-semibold mb-2">
                                {selectedInternship?.title}
                            </h2>

                            <p className="text-gray-600">
                                Company: {selectedInternship?.company}
                            </p>

                            <p className="text-gray-600">
                                Location: {selectedInternship?.location}
                            </p>

                        </div>


                        <h2 className="text-xl font-semibold mb-5">
                            Applicants ({applications.length})
                        </h2>


                        {applications.length === 0 ? (

                            <div className="bg-white p-8 rounded-xl shadow text-center">

                                <h3 className="text-xl font-semibold mb-2">
                                    No Applicants Yet
                                </h3>

                                <p className="text-gray-500">
                                    No students have applied for this internship yet.
                                </p>

                            </div>

                        ) : (

                            <div className="grid gap-5">

                                {applications.map(application => (

                                    <div
                                        key={application._id}
                                        className="bg-white p-6 rounded-xl shadow"
                                    >

                                        <div className="flex justify-between items-start flex-wrap gap-3">

                                            <div>

                                                <h3 className="text-xl font-semibold">
                                                    {application.student?.name || "Student"}
                                                </h3>

                                                <p className="text-gray-600 mt-2">
                                                    Email: {application.student?.email || "Not available"}
                                                </p>

                                            </div>


                                            {/* Status */}
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                    application.status === "selected"
                                                        ? "bg-green-100 text-green-700"
                                                        : application.status === "rejected"
                                                        ? "bg-red-100 text-red-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                }`}
                                            >
                                                {application.status || "pending"}
                                            </span>

                                        </div>


                                        <p className="text-gray-500 mt-4 mb-5">
                                            Applied Date:{" "}
                                            {application.createdAt
                                                ? new Date(
                                                    application.createdAt
                                                ).toLocaleDateString()
                                                : "Not available"}
                                        </p>


                                        {/* Select and Reject */}
                                        <div className="flex gap-3 flex-wrap">

                                            <button
                                                onClick={() =>
                                                    updateStatus(
                                                        application._id,
                                                        "selected"
                                                    )
                                                }
                                                disabled={updatingId === application._id}
                                                className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
                                            >
                                                {updatingId === application._id
                                                    ? "Updating..."
                                                    : "Select"}
                                            </button>


                                            <button
                                                onClick={() =>
                                                    updateStatus(
                                                        application._id,
                                                        "rejected"
                                                    )
                                                }
                                                disabled={updatingId === application._id}
                                                className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
                                            >
                                                {updatingId === application._id
                                                    ? "Updating..."
                                                    : "Reject"}
                                            </button>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        )}

                    </div>

                )}

            </div>

        </div>

    );

}

export default Applicants;
