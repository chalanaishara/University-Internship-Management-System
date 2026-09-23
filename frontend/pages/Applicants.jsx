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
        <div>

            <h1>Applicants</h1>

            {applications.map(application => (

                <div key={application._id}>

                    <h2>
                        {application.student.name}
                    </h2>

                    <p>
                        Email: {application.student.email}
                    </p>

                    <p>
                        Status: {application.status}
                    </p>

                    <button
                        onClick={() =>updateStatus(application._id,"selected")}
                    >
                        Select
                    </button>

                    <button
                        onClick={() =>updateStatus(application._id,"rejected")}
                    >
                        Reject
                    </button>

                </div>

            ))}

        </div>
    );
}

export default Applicants;