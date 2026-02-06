import React, { useContext } from 'react';
import { AuthContext } from '../auth/AuthProvider/AuthProvider';
import { Navigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Privaterout = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <div className='w-screen h-screen bg-white flex flex-col items-center justify-center'>
                <p>Lodging...</p>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default Privaterout;