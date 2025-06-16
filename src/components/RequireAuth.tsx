    import { Navigate } from 'react-router-dom';
    import { toast } from 'react-toastify';

    const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const token = localStorage.getItem('authToken');

    if (!token) {
    toast.error('You must be logged in to access this page.');
    return <Navigate to="/login" replace />;
    }

    return children;
    };

    export default RequireAuth;
