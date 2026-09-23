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
        <div>

            <h1>My Applications</h1>

            {applications.map(application => (

                <div key={application._id}>

                    <h2>
                        {application.internship.title}
                    </h2>

                    <p>
                        Company: {application.internship.company}
                    </p>

                    <p>
                        Location: {application.internship.location}
                    </p>

                    <p>
                        Status: {application.status}
                    </p>

                </div>

            ))}

        </div>
    );
}

export default MyApplications;