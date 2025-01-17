import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const PrivateRoute = ({ element }) => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <p>Chargement...</p>;
    }

    if (!user || user.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    return element;
};

export default PrivateRoute;
