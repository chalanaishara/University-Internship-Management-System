import { useEffect, useState } from "react";
import axios from "axios";

function MyApplications() {

    const [applications, setApplications] = useState([]);

    useEffect(() => {

        const token = localStorage.getItem("token");

        axios.get(
            "http://localhost:5000/api/applications/my",
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

    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-8">

            <h1 className="text-3xl font-bold mb-6">
                My Applications
            </h1>

            <div className="grid gap-4">

                {applications.map(application => (

                    <div
                        key={application._id}
                        className="bg-white p-6 rounded-xl shadow"
                    >

                        <h2 className="text-xl font-semibold mb-2">
                            {application.internship.title}
                        </h2>

                        <p className="text-gray-600">
                            Company: {application.internship.company}
                        </p>

                        <p className="text-gray-600">
                            Location: {application.internship.location}
                        </p>

                        <p className="mt-4">
                            Status:

                            <span className="ml-2 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">
                                {application.status}
                            </span>

                        </p>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default MyApplications;