import React, { useState, forwardRef } from 'react';

const Contact = forwardRef((props, refProp) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        // Here, you would typically send the data to your backend server or third-party service.
        console.log(name, email, message);
    }

    return (
        <div ref={refProp} className="p-4 bg-gradient-to-b from-neutral-800 to-neutral-900 text-neutral-50 flex flex-col items-center justify-center w-full min-h-screen">
            <h2 className="text-2xl mb-6 text-center">Contact Me</h2>
            <form onSubmit={handleSubmit} className="w-full max-w-md">
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2 text-neutral-50" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="shadow bg-neutral-50 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2 text-neutral-50" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow bg-neutral-50 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-bold mb-2 text-neutral-50" htmlFor="message">
                        Message
                    </label>
                    <textarea
                        className="resize-none h-52 bg-neutral-50 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="message"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-cyan-500 hover:bg-cyan-700 text-cyan-50 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
})

export default Contact;
