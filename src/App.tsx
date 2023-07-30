import React from "react";
import { Route, Routes, useLocation, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBlog, faUser, faProjectDiagram } from '@fortawesome/free-solid-svg-icons';
import Blog from "./components/Blog";
import BlogPostPage from "./components/BlogPostPage";
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
                            <FontAwesomeIcon icon={faBlog} /> Blog
                        </Link>
                        <Link
                            to="/"
                            className={`text-center p-1 text-xl w-1/3 transition-colors duration-500 ${location.pathname === "/"
                                ? "bg-gray-900 text-gray-50 delay-110"
                                : "bg-transparent text-gray-900 delay-110"
                                }`}
                        >
                            <FontAwesomeIcon icon={faUser} /> About
                        </Link>
                        <Link
                            to="/projects"
                            className={`text-center p-1 text-xl w-1/3 transition-colors duration-500 ${location.pathname === "/projects"
                                ? "bg-gray-900 text-gray-50 delay-110"
                                : "bg-transparent text-gray-900 delay-110"
                                }`}
                        >
                            <FontAwesomeIcon icon={faProjectDiagram} /> Projects
                        </Link>
                    </div>
                </nav>
            )}

            {/* Main Content Wrapper */}
            <main className="flex-grow p-6">
                <Routes>
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:title" element={<BlogPostPage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/" element={<About />} />
                </Routes>
            </main>
        </div>
    );
};

export default App;