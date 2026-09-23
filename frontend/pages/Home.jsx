import { useEffect, useState } from "react";
import axios from "axios";

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
        internship.title
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <div>

            <h1>Available Internships</h1>

            <input
                type="text"
                placeholder="Search internships"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <br />
            <br />

            {filteredInternships.map(internship => (

                <div key={internship._id}>

                    <h2>{internship.title}</h2>

                    <p>
                        Company: {internship.company}
                    </p>

                    <p>
                        Location: {internship.location}
                    </p>

                    <hr />

                </div>

            ))}

        </div>
    );
}

export default Home;