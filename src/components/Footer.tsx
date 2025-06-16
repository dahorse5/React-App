import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { FaHome, FaHeart, FaUser, FaPlus, FaTools, FaIdCard  } from 'react-icons/fa';

const Footer = () => {
const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
const isBiz = useSelector((state: RootState) => state.auth.isBiz);
const isAdmin = useSelector((state: RootState) => state.auth.isAdmin);

return (
<footer className="fixed bottom-0 w-full bg-gray-200 dark:bg-gray-800 text-sm py-2 px-4 z-50 sm:static sm:py-3">
<div className="flex justify-around items-center flex-wrap sm:gap-6">
    <Link to="/" className="flex items-center gap-1 hover:text-blue-600">
    <FaHome /> <span className="hidden sm:inline">Home</span>
    </Link>
    <Link to="/about" className="flex items-center gap-1 hover:text-blue-600">
    <FaUser /> <span className="hidden sm:inline">About</span>
    </Link>
    {isLoggedIn && (
    <Link to="/favorites" className="flex items-center gap-1 hover:text-red-500">
        <FaHeart /> <span className="hidden sm:inline">Favorites</span>
    </Link>
    )}
    {isBiz && (
    <Link to="/create-card" className="flex items-center gap-1 hover:text-green-600">
        <FaPlus /> <span className="hidden sm:inline">Create</span>
    </Link>
    )}
    {isBiz && (
        <Link to="/my-cards" className="flex items-center gap-1 hover:text-purple-600">
            <FaIdCard /> <span className="hidden sm:inline">My Cards</span>
        </Link>
    )}
    {isAdmin && (
    <Link to="/admin" className="flex items-center gap-1 hover:text-yellow-600">
        <FaTools /> <span className="hidden sm:inline">Admin</span>
    </Link>
    )}
</div>
</footer>
);
};

export default Footer;
