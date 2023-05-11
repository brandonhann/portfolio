import React, { forwardRef } from 'react';

const Contact = forwardRef((props, refProp) => {
    return (
        <div ref={refProp} className="p-4 bg-gradient-to-b from-neutral-800 to-neutral-900 text-neutral-50 flex items-center w-full h-screen">
            <h2>Contact info</h2>
        </div>
    );
})

export default Contact;