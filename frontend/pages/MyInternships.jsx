
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function MyInternships() {

    const [internships, setInternships] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    // Fetch internships
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


    // Delete internship
    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this internship?"
        );

        if (!confirmDelete) return;

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

            toast.success("Internship deleted successfully");

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to delete internship"
            );

        }
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
                    My Internships
                </h1>

                <p className="text-gray-600 mb-8">
                    Manage your internship opportunities.
                </p>


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


                                {/* Edit and Delete buttons only */}
                                <div className="flex gap-3 flex-wrap">

                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/company/internships/edit/${internship._id}`
                                            )
                                        }
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleDelete(internship._id)
                                        }
                                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>

    );

}

export default MyInternships;
