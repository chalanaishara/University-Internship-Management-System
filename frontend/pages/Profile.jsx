import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

function Profile() {

    const [user, setUser] = useState(null);
    const Navigate=useNavigate();


    useEffect(() => {

        const fetchProfile = async () => {

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

                setUser(response.data.user);

            } catch (error) {

                console.error("Profile error:", error);

            }

        };

        fetchProfile();

    }, []);


    if (!user) {

        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading profile...</p>
            </div>
        );

    }


    return (

        <div className="min-h-screen bg-gray-100 py-10 px-6">

            <div className="max-w-2xl mx-auto">

                <div className="bg-white rounded-xl shadow-md p-8">

                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        My Profile
                    </h1>

                    <p className="text-gray-800 mb-8 font-bold">
                        Your account information
                    </p>


                    <div className="space-y-5">

                        <div>
                            <p className="text-sm text-gray-500">
                                Name :
                            </p>

                            <p className="text-lg font-medium text-gray-800">
                                {user.name}
                            </p>
                        </div>


                        <div>
                            <p className="text-sm text-gray-500">
                                Email :
                            </p>

                            <p className="text-lg font-medium text-gray-800">
                                {user.email}
                            </p>
                        </div>


                        <div>
                            <p className="text-sm text-gray-500">
                                Role :
                            </p>

                            <p className="text-lg font-medium text-gray-800 capitalize">
                                {user.role}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                               Mobile :
                            </p>

                            <p className="text-lg font-medium text-gray-800 capitalize">
                                {user.mobile}
                            </p>
                        </div>
                        

                    </div>
                    <div className="mt-8">

            <button
                onClick={() => Navigate("/update")}
                     className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
                 Edit User
            </button>

                </div>

                    

                </div>

            </div>

        </div>

    );

}

export default Profile;

