import React, { forwardRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from 'troika-three-text';

const skills = [
    'JavaScript', 'Python', 'Java', 'C#', 'C++', 'ReactJS', 'TypeScript',
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
        <div ref={refProp} className="p-4 bg-gradient-to-b from-zinc-600 to-zinc-700 text-zinc-50 flex flex-col items-left justify-center w-full h-screen">
            <div className="fade-in flex flex-col md:flex-row">
                <div className="p-4 rounded-lg w-full md:w-1/2">
                    <h1 className="text-xl md:text-2xl text-left">Welcome to my portfolio</h1>
                    <h2 className="text-transparent font-bold bg-clip-text bg-gradient-to-b from-cyan-500 to-cyan-200 text-4xl md:text-7xl text-center">Brandon Hann</h2>
                    <h3 className="text-xl md:text-2xl text-right">Web Developer</h3>
                    <p className="typewriter mt-4">Test randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore </p>
                </div>
                <div className="p-4 rounded-lg mx-auto h-full w-full md:w-1/2">

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