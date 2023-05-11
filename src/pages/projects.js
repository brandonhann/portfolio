import React, { forwardRef } from 'react';

const Projects = forwardRef((props, refProp) => {
    return (
        <div ref={refProp} className="p-4 bg-gradient-to-b from-zinc-700 to-neutral-800 text-zinc-50 flex items-center w-full h-screen">
            <h2>My Projects</h2>
        </div>
    );
})

export default Projects;