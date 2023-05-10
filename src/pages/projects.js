import React, { forwardRef } from 'react';

const Projects = forwardRef((props, refProp) => {
    return (
        <div ref={refProp} className="fade-in flex items-center bg-red-600 w-full h-screen">
            <h2>My Projects</h2>
        </div>
    );
})

export default Projects;