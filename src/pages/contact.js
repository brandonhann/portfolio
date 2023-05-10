import React, { forwardRef } from 'react';

const Contact = forwardRef((props, refProp) => {
    return (
        <div ref={refProp} className="flex items-center w-full h-screen">
            <h2>Contact info</h2>
        </div>
    );
})

export default Contact;