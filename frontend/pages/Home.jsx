import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {

    const [internships, setInternships] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {

        axios.get("http://localhost:5000/api/internships")
            .then(response => {
                setInternships(response.data);
            })
            .catch(error => {
                console.log(error);
            });

    }, []);

   const filteredInternships = internships.filter(internship =>
    internship.title?.toLowerCase().includes(search.toLowerCase())
);

    return (
        <div className="min-h-screen bg-gray-100 p-8">

            <h1 className="text-3xl font-bold mb-6">
                Available Internships
            </h1>

            <input
                type="text"
                placeholder="Search internships"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2 mb-6"
            />

            <div className="grid gap-4">

                {filteredInternships.map(internship => (

                    <div
                        key={internship._id}
                        className="bg-white p-6 rounded-xl shadow"
                    >

                        <h2 className="text-xl font-semibold mb-2">
                            {internship.title}
                        </h2>

                        <p className="text-gray-600">
                            Company: {internship.company}
                        </p>

                        <p className="text-gray-600 mb-4">
                            Location: {internship.location}
                        </p>

                        <Link
                            to={`/internship/${internship._id}`}
                            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg"
                        >
                            View Details
                        </Link>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default Home;