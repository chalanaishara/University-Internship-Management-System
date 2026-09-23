import { useState } from "react";
import axios from "axios";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

const handleLogin = async (e) => {

    e.preventDefault();

    console.log("Button clicked");
    console.log("Email:", email);
    console.log("Password:", password);

    try {
        const response = await axios.post(
            "http://localhost:5000/api/auth/login",
            {
                email,
                password
            }
        );

        console.log(response.data);

        localStorage.setItem("token", response.data.token);

        console.log("Login successful");

    } catch (error) {
        console.log(error);
    }
};

    return (
        <div>

            <h1>Login</h1>

            <form onSubmit={handleLogin}>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <br /><br />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <br /><br />

                <button type="submit">
                    Login
                </button>

            </form>

        </div>
    );
}

export default Login;