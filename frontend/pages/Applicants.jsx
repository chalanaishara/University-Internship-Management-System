import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Applicants() {

    const { internshipId } = useParams();

    const [applications, setApplications] = useState([]);

    useEffect(() => {

        const token = localStorage.getItem("token");

        axios.get(
            `http://localhost:5000/api/applications/internship/${internshipId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then(response => {
            setApplications(response.data);
        })
        .catch(error => {
            console.log(error);
        });

    }, [internshipId]);


    // Update application status
    const updateStatus = async (applicationId, status) => {

        const token = localStorage.getItem("token");

        try {

            await axios.put(
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

            // Update status on the screen
            setApplications(prev =>
                prev.map(application =>
                    application._id === applicationId
                        ? {
                            ...application,
                            status: status
                        }
                        : application
                )
            );

        } catch (error) {

            console.log(error);

        }
    };


    return (
        <div className="min-h-screen bg-gray-100 p-8">

            <h1 className="text-3xl font-bold mb-6">
                Applicants
            </h1>

            <div className="grid gap-4">

                {applications.map(application => (

                    <div
                        key={application._id}
                        className="bg-white p-6 rounded-xl shadow"
                    >

                        <h2 className="text-xl font-semibold">
                            {application.student.name}
                        </h2>

                        <p className="text-gray-600 mt-2">
                            Email: {application.student.email}
                        </p>

                        <p className="my-4">
                            Status:

                            <span className="ml-2 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">
                                {application.status}
                            </span>
                        </p>

                        <button
                            onClick={() =>
                                updateStatus(
                                    application._id,
                                    "selected"
                                )
                            }
                            className="bg-green-600 text-white px-4 py-2 rounded-lg mr-2 hover:bg-green-700"
                        >
                            Select
                        </button>

                        <button
                            onClick={() =>
                                updateStatus(
                                    application._id,
                                    "rejected"
                                )
                            }
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                        >
                            Reject
                        </button>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default Applicants;