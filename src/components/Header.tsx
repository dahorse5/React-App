import { useSearch } from "../features/SearchContext";
import { Link } from 'react-router-dom';
import {
Button,
Navbar,
NavbarBrand,
NavbarCollapse,
NavbarLink,
NavbarToggle,
DarkThemeToggle,
} from 'flowbite-react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export default function Header() {
const { search, setSearch } = useSearch();
const user = useSelector((s: RootState) => s.auth.user);
const isLoggedIn = useSelector((s: RootState) => s.auth.isLoggedIn);
const isBiz = useSelector((s: RootState) => s.auth.isBiz);
const isAdmin = useSelector((s: RootState) => s.auth.isAdmin);

const defaultUserIcon =
"https://cdn-icons-png.flaticon.com/512/3177/3177440.png";

const handleSearch = (e) => setSearch(e.target.value);

return (
<Navbar fluid rounded>
    <NavbarBrand as={Link} to="/">
    <img
        src={user?.profileImage || defaultUserIcon}
        className="mr-3 h-8 w-8 rounded-full object-cover border"
        alt="User icon"
        onError={(e) => { e.target.src = defaultUserIcon; }}
    />
    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
        Or Hazan's Site
    </span>
    </NavbarBrand>
    <input
    type="text"
    placeholder="Search cards..."
    value={search}
    onChange={handleSearch}
    className="mx-4 rounded px-2 py-1 border border-gray-200 text-black"
    style={{ minWidth: 160 }}
    />
    <div className="flex md:order-2 items-center gap-2">
    <DarkThemeToggle />
    {isLoggedIn ? (
        <>
        <Button as={Link} to="/profile" color="blue" size="sm">
            Profile
        </Button>
        <Button as={Link} to="/create-card">
            Add New Card
        </Button>
        </>
    ) : (
        <>
        <Button as={Link} to="/login" color="blue" size="sm">
            Login
        </Button>
        <Button as={Link} to="/register" color="gray" size="sm">
            Register
        </Button>
        </>
    )}
    <NavbarToggle />
    </div>
    <NavbarCollapse>
    <NavbarLink as={Link} to="/">
        Home
    </NavbarLink>
    <NavbarLink as={Link} to="/about">
        About
    </NavbarLink>
    {isLoggedIn && (
        <NavbarLink as={Link} to="/favorites">
        Favorites
        </NavbarLink>
    )}
    {isBiz && (
        <NavbarLink as={Link} to="/my-cards">
        My Cards
        </NavbarLink>
    )}
    {isAdmin && (
        <NavbarLink as={Link} to="/admin">
        Admin
        </NavbarLink>
    )}
    </NavbarCollapse>
</Navbar>
);
}
