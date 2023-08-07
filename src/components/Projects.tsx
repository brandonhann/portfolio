import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faReact, faJsSquare, faEthereum } from "@fortawesome/free-brands-svg-icons";
import { faFire, faRobot, faRocket, faCubes, faDiamond, faArrowRight, faWind } from "@fortawesome/free-solid-svg-icons";

const languageIcons: { [key: string]: IconDefinition } = {
    'React': faReact,
    'Firebase': faFire,
    'JavaScript': faJsSquare,
    'TypeScript': faJsSquare,
    'OpenAI': faRobot,
    'Phaser': faRocket,
    'OpenGL': faCubes,
    'C++': faDiamond,
    'NextJS': faArrowRight,
    'Tailwind': faWind,
    'Solidity': faEthereum,
};


const ProjectItem = ({ title, desc, delay, repoLink, imageLink, websiteLink, languages = [] }: { title: string, desc: string, delay: number, repoLink: string, imageLink: string, websiteLink?: string, languages?: string[] }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, delay);

        return () => clearTimeout(timer);
    }, [delay]);

    return (
        <div className={`p-4 bg-gray-200 rounded-lg shadow-md transition-all duration-500 transform flex flex-col ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            <img src={imageLink} alt={title} className="h-32 w-full object-cover rounded-md" />
            <h2 className="text-lg font-semibold mb-2 mt-4">{title}</h2>
            <p className="text-gray-700 flex-grow">{desc}</p>
            <div className="mt-2">
                {languages.map((language, index) => (
                    <span key={index} className="cursor-pointer mr-2 text-gray-700 bg-gray-300 px-2 py-1 rounded-full inline-flex items-center text-sm transition-transform duration-200 hover:scale-110 my-1">
                        <FontAwesomeIcon icon={languageIcons[language]} className="mr-1" /> {language}
                    </span>
                ))}
            </div>
            <div className="mt-2 flex">
                <a href={repoLink} target="_blank" rel="noreferrer" className="mr-2 text-blue-500 hover:text-blue-600 inline-block">View Repository</a>
                {websiteLink && <a href={websiteLink} target="_blank" rel="noreferrer" className="text-blue-500 hover:text-blue-600 inline-block ml-2">Website</a>}
            </div>
        </div>
    );
};

const Projects = () => {
    const projects = [
        { title: 'MintyGen', delay: 200, repoLink: 'https://github.com/brandonhann/mintygen-engine', imageLink: '/images/mintygen.jpg', desc: "MintyGen is an innovative NFT generator app that allows you to easily create unique and stunning NFTs. With our user-friendly web compiler and powerful engine, you can customize various aspects of your NFTs with just a few clicks. We offer a purchasable license key on the Fantom network for a quick and secure experience.", websiteLink: 'https://mintygen.com', languages: ['React', 'TypeScript', 'Tailwind', 'Solidity'] },
        { title: 'My Portfolio', delay: 400, repoLink: 'https://github.com/brandonhann/portfolio', imageLink: '/images/portfolio.jpg', desc: "(Hint, it's this website!) My Portfolio is a showcase for myself! As you see I'm showing a bit about myself, displaying my projects and my very own blog section! The blog utilizes firebase to store post data. I can post to my post section and add base64 encoded images using an admin panel I made using firebase authentication.", websiteLink: 'https://brandonhann.dev', languages: ['React', 'TypeScript', 'Firebase', 'Tailwind'] },
        { title: 'Quick-GPT', delay: 600, repoLink: 'https://github.com/brandonhann/quick-gpt', imageLink: '/images/quickgpt.jpg', desc: "Quick-GPT is a browser extension which utilizes OpenAI's API key to search to quickly make a prompt. Highlight  any text and right click 'QuickGPT Search' to get results. You can preset a prefix option, suffix option and max tokens to customize your prompts better.", languages: ['JavaScript', 'OpenAI'] },
        { title: 'OpenGL 3D Render Engine', delay: 800, repoLink: 'https://github.com/brandonhann/tritale', imageLink: '/images/opengl.jpg', desc: "My very own OpenGL 3d Render Engine built from scratch with C++. This application includes a 1st & 3rd person camera, toggle views, camera movement, lighting and physics (gravity). I used perlin noise and random seed to randomize terrain generation.", languages: ['C++', 'OpenGL'] },
        { title: 'Phaser Grid World', delay: 1000, repoLink: 'https://github.com/brandonhann/phaser-grid-world', imageLink: '/images/gridworld.jpg', desc: "Built using Typescript and Phaser3 Framework I made a 2d infinite world generator. I used random seed and saves via localstorage. I also used simplex noise for the terrain randomization. Includes a custom minimap as well to view a larger perspective area.", languages: ['React', 'Phaser', 'TypeScript'] },
        { title: 'Phi Shape Generator', delay: 1200, repoLink: 'https://github.com/brandonhann/phi-geometry-generator', imageLink: '/images/phi.jpg', desc: "This app allows you to generate unique shapes using ϕ (phi) which output many different variations. Built using nextjs.", languages: ['React', 'NextJS', 'JavaScript'] },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map(project => (
                <ProjectItem key={project.title} title={project.title} desc={project.desc} delay={project.delay} repoLink={project.repoLink} imageLink={project.imageLink} websiteLink={project.websiteLink} languages={project.languages} />
            ))}
        </div>
    );
};

export default Projects;