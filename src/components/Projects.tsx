import React, { useEffect, useState } from 'react';

const ProjectItem = ({ title, desc, delay, repoLink, imageLink }: { title: string, desc: string, delay: number, repoLink: string, imageLink: string }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, delay);

        return () => clearTimeout(timer);
    }, [delay]);

    return (
        <div className={`p-4 bg-gray-200 rounded-lg shadow-md transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            <img src={imageLink} alt={title} className="h-32 w-full object-cover rounded-md" />
            <h2 className="text-lg font-semibold mb-2 mt-4">{title}</h2>
            <p className="text-gray-700">{desc}</p>
            <a href={repoLink} target="_blank" rel="noreferrer" className="text-blue-500 hover:text-blue-600 mt-2 inline-block">View Repository</a>
        </div>
    );
};

const Projects = () => {
    const projects = [
        { title: 'MintyGen', delay: 200, repoLink: 'https://github.com/brandonhann/mintygen-engine', imageLink: 'https://via.placeholder.com/150', desc: "MintyGen is an innovative NFT generator app that allows you to easily create unique and stunning NFTs. With our user-friendly web compiler and powerful engine, you can customize various aspects of your NFTs with just a few clicks. We offer a purchasable license key on the Fantom network for a quick and secure experience." },
        { title: 'Project 2', delay: 400, repoLink: '#', imageLink: 'https://via.placeholder.com/150', desc: 'Description' },
        { title: 'Project 3', delay: 600, repoLink: '#', imageLink: 'https://via.placeholder.com/150', desc: 'Description' },
        { title: 'Project 4', delay: 800, repoLink: '#', imageLink: 'https://via.placeholder.com/150', desc: 'Description' },
        { title: 'Project 4', delay: 800, repoLink: '#', imageLink: 'https://via.placeholder.com/150', desc: 'Description' },
        { title: 'Project 5', delay: 1000, repoLink: '#', imageLink: 'https://via.placeholder.com/150', desc: 'Description' },
        { title: 'Project 6', delay: 1200, repoLink: '#', imageLink: 'https://via.placeholder.com/150', desc: 'Description' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map(project => (
                <ProjectItem key={project.title} title={project.title} desc={project.desc} delay={project.delay} repoLink={project.repoLink} imageLink={project.imageLink} />
            ))}
        </div>
    );
};

export default Projects;