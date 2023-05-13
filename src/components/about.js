import React, { forwardRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from 'troika-three-text';

const skills = [
    'JavaScript', 'Python', 'Java', 'C#', 'C++', 'ReactJS', 'ThreeJS',
    'HTML5', 'CSS3', 'Tailwind', 'PHP', 'Solidity', 'Arduino', 'Lua', 'SQL',
];

const xBoundary = [-3, 3];
const yBoundary = [-3, 3];
const zBoundary = [-3, 3];

function getRandomPosition(boundary) {
    return Math.random() * (boundary[1] - boundary[0]) + boundary[0];
}


const TextMesh = ({ text, position }) => {
    const mesh = useMemo(() => {
        const mesh = new Text();
        mesh.text = text;
        mesh.fontSize = 0.8;
        mesh.outlineWidth = 0.05;
        mesh.color = 0x00ccff;
        mesh.sync();
        return mesh;
    }, [text]);

    const [pos, setPos] = useState(position);
    const [velocity, setVelocity] = useState([
        Math.random() * 0.03 - 0.015,
        Math.random() * 0.03 - 0.015,
        Math.random() * 0.03 - 0.015
    ]);

    useFrame(() => {
        const newPos = [
            pos[0] + velocity[0],
            pos[1] + velocity[1],
            pos[2] + velocity[2]
        ];

        if (newPos[0] < xBoundary[0] || newPos[0] > xBoundary[1]) {
            velocity[0] = -velocity[0];
        }
        if (newPos[1] < yBoundary[0] || newPos[1] > yBoundary[1]) {
            velocity[1] = -velocity[1];
        }
        if (newPos[2] < zBoundary[0] || newPos[2] > zBoundary[1]) {
            velocity[2] = -velocity[2];
        }

        setPos(newPos);
    });

    return <primitive object={mesh} position={pos} />;
};

const About = forwardRef((props, refProp) => {
    return (
        <div ref={refProp} className="p-4 bg-gradient-to-b from-zinc-600 to-zinc-700 text-zinc-50 flex flex-col items-left justify-center w-full min-h-screen">
            <div className="fade-in flex flex-col md:flex-row">
                <div className="p-4 rounded-lg w-full md:w-1/2">
                    <div className='border-b border-zinc-400 pb-4'>
                        <h1 className="text-lg md:text-2xl text-left italic">Welcome to my portfolio</h1>
                        <h2 className="text-transparent font-bold bg-clip-text bg-gradient-to-b from-cyan-500 to-cyan-200 text-4xl md:text-7xl text-center">Brandon Hann</h2>
                        <h3 className="text-lg md:text-2xl text-right italic">Web Developer</h3>
                    </div>
                    <div className='typewriter first-letter:text-xl'>
                        <p className="mt-4">
                            As an accomplished <span className='text-cyan-200'>front-end developer</span>, I possess experience in designing and implementing user interfaces that are visually appealing and intuitive to navigate, with a specific focus on utilizing <span className='text-cyan-200'>ReactJS</span>. Furthermore, I have sharpened my expertise in <span className='text-cyan-200'>Solidity</span>, blockchain, and web3 development, which has allowed me to proficiently develop decentralized applications that are secure and reliable.
                        </p>
                        <p className='mt-4'>
                            I study computer programming at <span className='text-cyan-200'>Georgian College</span> and work as a Field Technician Team Lead for a Retail AI company, gaining practical insights on coding and technology's role in business optimization. This real-world experience complements my academic studies and enhances my skills and industry understanding.
                        </p>
                    </div>
                </div>
                <div className="p-4 rounded-lg mx-auto">
                    <Canvas>
                        {skills.map((language, index) => (
                            <TextMesh
                                key={index}
                                text={language}
                                position={[
                                    getRandomPosition(xBoundary),
                                    getRandomPosition(yBoundary),
                                    getRandomPosition(zBoundary)
                                ]}
                            />
                        ))}
                    </Canvas>
                </div>
            </div>
        </div >
    );
})

export default About;