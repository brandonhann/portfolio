import React, { forwardRef } from 'react';

const About = forwardRef((props, refProp) => {
    return (
        <div ref={refProp} className="p-4 bg-gradient-to-b from-zinc-600 to-zinc-700 text-zinc-50 flex flex-col items-left justify-center w-full h-screen">
            <div className="flex flex-col md:flex-row">
                <div className="p-4 rounded-lg w-full md:w-1/2">
                    <h2 className="text-2xl text-left">Welcome to my portfolio</h2>
                    <h3 className="text-transparent font-bold bg-clip-text bg-gradient-to-b from-cyan-500 to-cyan-200 text-7xl text-center">Brandon Hann</h3>
                    <h4 className="text-2xl text-right">Web Developer</h4>
                    <p className="mt-4">Test randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore </p>
                </div>
                <div>
                    <div className="p-4 rounded-lg backdrop-blur-md bg-white/10">
                        <p>test</p>
                    </div>
                </div>
            </div>
        </div >
    );
})

export default About;