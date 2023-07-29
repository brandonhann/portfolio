import React from "react";
import { Route, Routes, useLocation, Link } from 'react-router-dom';
import Blog from "./components/Blog";
import About from "./components/About";
import Projects from "./components/Projects";
import Admin from "./components/Admin";
import "./index.css";

const App: React.FC = () => {
    const location = useLocation();
    const isAdminRoute = location.pathname === "/admin";

    return (
        /* Navigation */
        <div className="bg flex flex-col min-h-screen">
            {!isAdminRoute && (
                <nav>
                    <div className="flex justify-around">
                        <Link
                            to="/blog"
                            className={`text-center p-1 text-xl w-1/3 transition-colors duration-500 ${location.pathname === "/blog"
                                ? "bg-gray-900 text-gray-50 delay-110"
                                : "bg-transparent text-gray-900 delay-110"
                                }`}
                        >
                            Blog
                        </Link>
                        <Link
                            to="/"
                            className={`text-center p-1 text-xl w-1/3 transition-colors duration-500 ${location.pathname === "/"
                                ? "bg-gray-900 text-gray-50 delay-110"
                                : "bg-transparent text-gray-900 delay-110"
                                }`}
                        >
                            About
                        </Link>
                        <Link
                            to="/projects"
                            className={`text-center p-1 text-xl w-1/3 transition-colors duration-500 ${location.pathname === "/projects"
                                ? "bg-gray-900 text-gray-50 delay-110"
                                : "bg-transparent text-gray-900 delay-110"
                                }`}
                        >
                            Projects
                        </Link>
                    </div>
                </nav>
            )}

            {/* Main Content Wrapper */}
            <main className="flex-grow p-6">
                <Routes>
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/" element={<About />} />
                </Routes>
            </main>
        </div>
    );
};

export default App;