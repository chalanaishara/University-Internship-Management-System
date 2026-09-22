import { useState, useEffect } from "react";

function Home() {

    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log("Home page loaded");
    }, []);

    return (
        <>
            <h1>
                Home Page
            </h1>

            <h2>
                {count}
            </h2>

            <button onClick={() => setCount(count + 1)}>
                Increase
            </button>
        </>
    );
}

export default Home;