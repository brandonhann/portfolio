import React, { forwardRef } from 'react';

const projectItems = [
    {
        name: "MintyGen",
        website: "https://mintygen.com",
        github: "https://github.com/brandonhann/mintygen-engine"
    },
    {
        name: "KnowTools",
        website: "https://know.tools",
        github: "https://github.com/brandonhann/knowtools"
    },
    {
        name: "Portfolio",
        website: "https://brandonhann.vercel.app",
        github: "https://github.com/brandonhann/portfolio"
    },
    {
        name: "GC Open Concert Night",
        website: "https://gc-concert.vercel.app",
        github: "https://github.com/brandonhann/gc-open-concert-night"
    },
];

const Projects = forwardRef((props, refProp) => {
    return (
        <div ref={refProp} className="p-4 bg-gradient-to-b from-zinc-700 to-neutral-800 text-zinc-50 flex items-center w-full h-full min-h-screen">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)) lg:grid-cols-4 gap-4 h-full w-full">
                {projectItems.map((project, index) => (
                    <div key={index} className="border border-gray-200 p-4 rounded-lg flex flex-col items-center justify-center bg-white/10">
                        <h2 className="text-xl font-bold mb-2">{project.name}</h2>
                        <a href={project.website} target="_blank" rel="noopener noreferrer" className="text-cyan-500 hover:text-cyan-600 transition-colors duration-200">Website</a>
                        <br />
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-cyan-500 hover:text-cyan-600 transition-colors duration-200">Github</a>
                    </div>
                ))}
            </div>
        </div>
    );
})

export default Projects;
