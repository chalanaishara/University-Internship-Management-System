import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function EditUser() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

        const fetchUser = async () => {

            try {

                const token = localStorage.getItem("token");

                const response = await axios.get(
                    "http://localhost:5000/api/auth/profile",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setName(response.data.user.name);
                setEmail(response.data.user.email);
                setMobile(response.data.user.mobile || "");

            } catch (error) {

                console.log("Fetch user error:", error);

                toast.error("Failed to load user details");
            }
        };

        fetchUser();

    }, []);


    const handleUpdate = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            await axios.put(
                "http://localhost:5000/api/auth/update",
                {
                    name,
                    email,
                    mobile
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success("Profile updated successfully");

            navigate("/profile");

        } catch (error) {

            console.log("Update error:", error);

            toast.error(
                error.response?.data?.message ||
                "Failed to update profile"
            );
        }
    };


    return (

        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

            <div className="bg-white w-full max-w-md p-8 rounded-xl shadow">

                <h1 className="text-2xl font-bold text-center mb-6">
                    Edit Profile
                </h1>


                <form onSubmit={handleUpdate}>

                    <div className="mb-4">

                        <label className="block mb-2 font-medium">
                            Name
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-lg px-4 py-2"
                        />

                    </div>


                    <div className="mb-4">

                        <label className="block mb-2 font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-lg px-4 py-2"
                        />

                    </div>


                    <div className="mb-6">

                        <label className="block mb-2 font-medium">
                            Mobile Number
                        </label>

                        <input
                            type="tel"
                            value={mobile}
                            onChange={(e) =>
                                setMobile(e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-lg px-4 py-2"
                        />

                    </div>


                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                    >
                        Save Changes
                    </button>

                </form>

            </div>

        </div>
    );
}

export default EditUser;