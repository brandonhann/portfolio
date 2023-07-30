import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

const About = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 200);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`flex flex-col items-center justify-center py-5 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex sm:hidden items-center text-center space-x-4 mb-4">
                <h1 className="namefont text-4xl font-bold text-gray-700">Brandon</h1>
                <h1 className="namefont text-4xl font-bold text-gray-700">Hann</h1>
            </div>
            <div className="sm:hidden flex items-center text-center space-x-4">
                <img
                    className="mx-auto h-60 w-60 rounded-full border border-gray-500 shadow-lg transform transition-transform duration-500 hover:scale-110"
                    src="/me.jpg"
                    alt="Me!"
                />
            </div>
            <div className="hidden sm:grid sm:grid-cols-3 items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="text-center sm:text-left justify-self-start">
                    <h1 className="namefont text-4xl sm:text-6xl font-bold text-gray-700">Brandon</h1>
                </div>
                <div>
                    <img
                        className="mx-auto h-40 w-40 rounded-full border border-gray-500 shadow-lg transform transition-transform duration-500 hover:scale-110"
                        src="/me.jpg"
                        alt="Me!"
                    />
                </div>
                <div className="text-center sm:text-right justify-self-center">
                    <h1 className="namefont text-4xl sm:text-6xl font-bold text-gray-700">Hann</h1>
                </div>
            </div>

            <div className="p-4 w-full md:w-2/3">
                <h2 className="text-2xl font-bold mb-2">About Me</h2>
                <p className="text-gray-700 text-lg">
                    23 y/o Computer Science student residing in Toronto, Canada. I am passionate about blockchain, software,  AI and full stack. I'm always exploring new spaces and learning new and interesting things.
                </p>
            </div>

            <div className="p-4 w-full md:w-2/3 border-gray-300">
                <h2 className="text-2xl font-bold mb-2">My Skills</h2>
                <p className="text-gray-700 text-lg">
                    Typescript, JavaScript, Tailwind, Python, Solidity, Java, C++, Lua, PHP, SQL, Git
                </p>
            </div>

            <div className="p-4 w-full md:w-2/3 border-b border-gray-300">
                <p className="text-gray-700 text-lg">
                    I've made my portfolio's code public on GitHub. Feel free to check it out <a className='text-blue-500 hover:underline' href='https://github.com/brandonhann/portfolio' target='_blank' rel='noreferrer'>here</a>!
                </p>
            </div>

            <div className="flex p-4 space-x-4 text-xl">
                <a
                    href="https://www.youtube.com/brandon_hann"
                    className="text-red-600 transform transition-transform duration-500 hover:scale-125"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FontAwesomeIcon icon={faYoutube} />
                </a>
                <a
                    href="https://github.com/brandonhann"
                    className="text-gray-600 transform transition-transform duration-500 hover:scale-125"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FontAwesomeIcon icon={faGithub} />
                </a>
                <a
                    href="https://linkedin.com/in/brandonhann"
                    className="text-blue-600 transform transition-transform duration-500 hover:scale-125"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a
                    href="https://twitter.com/brandnhann"
                    className="text-blue-400 transform transition-transform duration-500 hover:scale-125"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FontAwesomeIcon icon={faTwitter} />
                </a>
            </div>
        </div>
    );
};

export default About;
