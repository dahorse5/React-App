import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

type Role = 'admin' | 'biz' | 'regular';

const RequireRole = ({
children,
roles,
}: {
children: JSX.Element;
roles: Role[];
}) => {
const isLoggedIn = useSelector((s: RootState) => s.auth.isLoggedIn);
const isAdmin = useSelector((s: RootState) => s.auth.isAdmin);
const isBiz = useSelector((s: RootState) => s.auth.isBiz);
const [errorShown, setErrorShown] = useState(false);

const roleMap = {
admin: isAdmin,
biz: isBiz || isAdmin,
regular: isLoggedIn && !isBiz && !isAdmin,
};

const hasAccess = roles.some((r) => roleMap[r]);

useEffect(() => {
if (!hasAccess && isLoggedIn && !errorShown) {
    toast.error('Access denied.');
    setErrorShown(true);
}
}, [hasAccess, isLoggedIn, errorShown]);

if (!isLoggedIn) {
return <Navigate to="/login" replace />;
}
if (!hasAccess) {
return <Navigate to="/" replace />;
}
return children;
};

export default RequireRole;
