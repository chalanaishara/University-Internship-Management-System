import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MyInternships() {

    const [internships, setInternships] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        const token = localStorage.getItem("token");

        axios.get(
            "http://localhost:5000/api/internships",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then(response => {
            setInternships(response.data);
        })
        .catch(error => {
            console.log(error);
        });

    }, []);

    const handleDelete = async (id) => {

    const token = localStorage.getItem("token");

    try {

        await axios.delete(
            `http://localhost:5000/api/internships/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setInternships(prev =>
            prev.filter(internship => internship._id !== id)
        );

        console.log("Internship deleted successfully");

    } catch (error) {

        console.log("Delete error:", error);
        console.log("Error response:", error.response?.data);

    }
};


    return (

        <div className="min-h-screen bg-gray-100 p-8">

            <div className="max-w-6xl mx-auto">

                <h1 className="text-3xl font-bold mb-2">
                    My Internships
                </h1>

                <p className="text-gray-600 mb-8">
                    Manage your internship opportunities.
                </p>


                <div className="grid gap-6">

                    {internships.map(internship => (

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


                            <div className="flex gap-3">

                               <button
                                    onClick={() =>
                                    navigate(`/company/internships/edit/${internship._id}`)
                                    }
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                    >
                                    Edit
                                    </button>

                                <button
                                    onClick={() => handleDelete(internship._id)}
                                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                                >
                                Delete
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>

    );
}

export default MyInternships;