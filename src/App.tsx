import React, { useState } from "react";
import Blog from "./components/Blog";
import About from "./components/About";
import Projects from "./components/Projects";
import "./index.css";

const Content = ({ selected }: { selected: string }) => {
    switch (selected) {
        case "Blog":
            return <Blog />;
        case "About":
            return <About />;
        case "Projects":
            return <Projects />;
        default:
            return <About />;
    }
};

const App: React.FC = () => {
    const [selected, setSelected] = useState("About");

    return (
        /* Navigation */
        <div className="bg flex flex-col min-h-screen">
            <nav>
                <div className="flex justify-around">
                   <button
                        className={`p-2 text-xl w-1/2 transition-colors duration-500 ${
                            selected === "Blog"
                                ? "bg-gray-900 text-gray-50 delay-110"
                                : "bg-transparent text-gray-900 delay-110"
                        }`}
                        onClick={() => setSelected("Blog")}
                    >
                    Blog
                    </button>
                    <button
                        className={`p-2 text-xl w-1/2 transition-colors duration-500 ${
                            selected === "About"
                                ? "bg-gray-900 text-gray-50 delay-110"
                                : "bg-transparent text-gray-900 delay-110"
                        }`}
                        onClick={() => setSelected("About")}
                    >
                        About
                    </button>
                    <button
                        className={`p-2 text-xl w-1/2 transition-colors duration-500 ${
                            selected === "Projects"
                                ? "bg-gray-900 text-gray-50 delay-110"
                                : "bg-transparent text-gray-900 delay-110"
                        }`}
                        onClick={() => setSelected("Projects")}
                    >
                        Projects
                    </button>
                </div>
            </nav>
            
            {/* Main Content Wrapper */}
            <main className="flex-grow p-6">
                <Content selected={selected} />
            </main>
        </div>
    );
};

export default App;
