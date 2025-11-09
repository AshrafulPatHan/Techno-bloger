import React from 'react';

const Mape = () => {
    return (
        <div className='flex flex-col items-center mt-10'>
            <div>
                <div className='bitter-Title'>
                    <h2 className='text-4xl font-bold text-center mt-5 mb-6 '>Our Office Location</h2>
                </div>
                <div className='flex flex-col items-center'>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d5741.207821606041!2d-116.93034745776961!3d43.98824015527971!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1762666061232!5m2!1sen!2sbd"
                        className='h-[400px] w-[100vw] '
                        style={{ border: 0 }}
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </div>
    );
};

export default Mape;
