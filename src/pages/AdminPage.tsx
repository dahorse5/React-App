import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaEye, FaDownload } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSearch } from "../features/SearchContext";
import { deleteUser, getAllUsers } from "../services/userService";
import { useNavigate } from "react-router-dom";

const ROLES = ["All", "Admin", "Business", "User"];
const PAGE_SIZE = 10;
const AdminPage = () => {
const navigate = useNavigate();
const { search, setSearch } = useSearch();
const [users, setUsers] = useState([]);
const [filtered, setFiltered] = useState([]);
const [selected, setSelected] = useState<string[]>([]);
const [loading, setLoading] = useState(true);
const [page, setPage] = useState(1);
const [roleFilter, setRoleFilter] = useState("All");
const [statusFilter, setStatusFilter] = useState("All");
const [sortBy, setSortBy] = useState("name");
const [sortAsc, setSortAsc] = useState(true);
const [showModal, setShowModal] = useState(false);
const [modalUser, setModalUser] = useState(null);

useEffect(() => {
setLoading(true);
    getAllUsers()
    .then((res) => {
    setUsers(res.data);
    })
    .catch(() => toast.error("Failed to load users."))
    .finally(() => setLoading(false));
}, []);

useEffect(() => {
let temp = [...users];
if (roleFilter !== "All") {
    temp = temp.filter((u) =>
    roleFilter === "Admin"
        ? u.isAdmin
        : roleFilter === "Business"
        ? u.isBiz
        : !u.isAdmin && !u.isBiz
    );
}
if (statusFilter !== "All") {
    temp = temp.filter((u) =>
    statusFilter === "Logged in"
        ? u.isLoggedIn
        : !u.isLoggedIn
    );
}
if (search) {
    temp = temp.filter(
    (user) =>
        user.name?.first?.toLowerCase().includes(search.toLowerCase()) ||
        user.name?.last?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase())
    );
}
temp.sort((a, b) => {
    let valA, valB;
    switch (sortBy) {
    case "name":
        valA = `${a.name?.first || ""} ${a.name?.last || ""}`;
        valB = `${b.name?.first || ""} ${b.name?.last || ""}`;
        break;
    case "email":
        valA = a.email;
        valB = b.email;
        break;
    case "role":
        valA = a.isAdmin ? "Admin" : a.isBiz ? "Business" : "User";
        valB = b.isAdmin ? "Admin" : b.isBiz ? "Business" : "User";
        break;
    case "status":
        valA = a.isLoggedIn ? 1 : 0;
        valB = b.isLoggedIn ? 1 : 0;
        break;
    default:
        valA = valB = "";
    }
    if (valA < valB) return sortAsc ? -1 : 1;
    if (valA > valB) return sortAsc ? 1 : -1;
    return 0;
});
setFiltered(temp);
setPage(1);
}, [users, search, roleFilter, statusFilter, sortBy, sortAsc]);

const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

const toggleSort = (col) => {
if (sortBy === col) setSortAsc(!sortAsc);
else {
    setSortBy(col);
    setSortAsc(true);
}
};

const handleDelete = async (id) => {
if (!window.confirm("Delete this user?")) return;
try {
    await deleteUser(id);
    setUsers((prev) => prev.filter((u) => u._id !== id));
    toast.success("User deleted.");
} catch {
    toast.error("Failed to delete user.");
}
};

const handleBulkDelete = async () => {
if (selected.length === 0) return;
if (!window.confirm("Delete selected users?")) return;
try {
    await Promise.all(
    selected.map((id) =>
        deleteUser(id)
    )
    );
    setUsers((prev) => prev.filter((u) => !selected.includes(u._id)));
    setSelected([]);
    toast.success("Selected users deleted.");
} catch {
    toast.error("Bulk delete failed.");
}
};

const openUserModal = (user) => {
setModalUser(user);
setShowModal(true);
};

const closeModal = () => {
setShowModal(false);
setModalUser(null);
};

const toggleSelect = (id) => {
setSelected((prev) =>
    prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
);
};

const toggleSelectAll = () => {
if (paginated.length > 0 && paginated.every((u) => selected.includes(u._id))) {
    setSelected((prev) => prev.filter((id) => !paginated.map((u) => u._id).includes(id)));
} else {
    setSelected((prev) => [
    ...prev,
    ...paginated.filter((u) => !prev.includes(u._id)).map((u) => u._id),
    ]);
}
};

const exportCSV = () => {
const rows = [
    ["Full Name", "Email", "Role", "Status"],
    ...filtered.map((u) => [
    `${u.name?.first || ""} ${u.name?.last || ""}`,
    u.email,
    u.isAdmin ? "Admin" : u.isBiz ? "Business" : "User",
    u.isLoggedIn ? "Logged in" : "Logged out",
    ]),
];
const csv =
    rows.map((r) => r.map((x) => `"${x}"`).join(",")).join("\n");
const blob = new Blob([csv], { type: "text/csv" });
const url = window.URL.createObjectURL(blob);
const a = document.createElement("a");
a.href = url;
a.download = "users.csv";
a.click();
window.URL.revokeObjectURL(url);
};

const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

return (
<div className="container mx-auto py-8 px-4">
    <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
        Users CRM Dashboard
    </h1>
    <div className="flex gap-2 flex-wrap">
        <select
        value={roleFilter}
        onChange={(e) => setRoleFilter(e.target.value)}
        className="rounded border px-2 py-1"
        >
        {ROLES.map((role) => (
            <option key={role}>{role}</option>
        ))}
        </select>
        <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="rounded border px-2 py-1"
        >
        {["All", "Logged in", "Logged out"].map((status) => (
            <option key={status}>{status}</option>
        ))}
        </select>
        <button
        className="bg-gray-200 rounded px-3 py-1 flex items-center gap-2"
        onClick={exportCSV}
        >
        <FaDownload /> Export CSV
        </button>
        <button
        className={`bg-red-500 text-white rounded px-3 py-1 flex items-center gap-2 ${selected.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={handleBulkDelete}
        disabled={selected.length === 0}
        >
        <FaTrash /> Delete Selected
        </button>
    </div>
    </div>
    <div className="overflow-x-auto rounded shadow bg-white dark:bg-gray-800">
    <table className="min-w-full">
        <thead>
        <tr>
            <th className="p-2 border-b">
            <input
                type="checkbox"
                checked={paginated.length > 0 && paginated.every((u) => selected.includes(u._id))}
                onChange={toggleSelectAll}
            />
            </th>
            <th className="p-2 border-b cursor-pointer" onClick={() => toggleSort("name")}>
            Full Name
            </th>
            <th className="p-2 border-b cursor-pointer" onClick={() => toggleSort("email")}>
            Email
            </th>
            <th className="p-2 border-b cursor-pointer" onClick={() => toggleSort("role")}>
            Role
            </th>
            <th className="p-2 border-b cursor-pointer" onClick={() => toggleSort("status")}>
            Status
            </th>
            <th className="p-2 border-b">Actions</th>
        </tr>
        </thead>
        <tbody>
        {paginated.map((user) => (
            <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
            <td className="p-2 border-b">
                <input
                type="checkbox"
                checked={selected.includes(user._id)}
                onChange={() => toggleSelect(user._id)}
                />
            </td>
            <td className="p-2 border-b">
                {user.name?.first} {user.name?.last}
            </td>
            <td className="p-2 border-b">{user.email}</td>
            <td className="p-2 border-b">
                <span className={
                user.isAdmin
                    ? "bg-red-200 text-red-800 px-2 py-1 rounded"
                    : user.isBiz
                    ? "bg-blue-200 text-blue-800 px-2 py-1 rounded"
                    : "bg-gray-200 text-gray-800 px-2 py-1 rounded"
                }>
                {user.isAdmin
                    ? "Admin"
                    : user.isBiz
                    ? "Business"
                    : "User"}
                </span>
            </td>
            <td className="p-2 border-b">
                {user.isLoggedIn ? (
                <span className="bg-green-200 text-green-800 px-2 py-1 rounded">Logged in</span>
                ) : (
                <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded">Logged out</span>
                )}
            </td>
            <td className="p-2 border-b flex gap-2">
                <button
                className="bg-blue-500 text-white rounded px-2 py-1"
                onClick={() => openUserModal(user)}
                >
                <FaEye />
                </button>
                <button
                className="bg-blue-400 text-white rounded px-2 py-1"
                onClick={() => navigate(`/admin-edit-user/${user._id}`)}
                >
                <FaEdit />
                </button>
                <button
                className="bg-red-500 text-white rounded px-2 py-1"
                onClick={() => handleDelete(user._id)}
                >
                <FaTrash />
                </button>
            </td>
            </tr>
        ))}
        </tbody>
    </table>
    {filtered.length === 0 && (
        <div className="text-center text-gray-600 mt-6 p-4">
        No users found.
        </div>
    )}
    </div>
<div className="mt-6 overflow-x-auto">
<div className="flex justify-center gap-2 whitespace-nowrap min-w-fit">
    <button
        className={`px-3 py-1 rounded-md transition ${
        page === 1
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-white'
        }`}
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        disabled={page === 1}
    >
        ‹
    </button>
    {Array.from({ length: totalPages }, (_, i) => (
        <button
        key={i}
        onClick={() => setPage(i + 1)}
        className={`w-8 h-8 rounded-full font-semibold transition ${
            page === i + 1
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200'
        }`}
        >
        {i + 1}
        </button>
    ))}
    <button
        className={`px-3 py-1 rounded-md transition ${
        page === totalPages
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-white'
        }`}
        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={page === totalPages}
    >
        ›
    </button>
    </div>
</div>
    {showModal && modalUser && (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 shadow-lg min-w-[300px] max-w-[90vw]">
        <div className="flex justify-between items-center mb-4">
            <div className="text-xl font-bold">User Details</div>
            <button className="text-gray-500 text-2xl" onClick={closeModal}>&times;</button>
        </div>
        <div className="space-y-2">
            <div>
            <span className="font-semibold">Full Name: </span>
            {modalUser.name?.first} {modalUser.name?.last}
            </div>
            <div>
            <span className="font-semibold">Email: </span>
            {modalUser.email}
            </div>
            <div>
            <span className="font-semibold">Role: </span>
            {modalUser.isAdmin
                ? "Admin"
                : modalUser.isBiz
                ? "Business"
                : "User"}
            </div>
            <div>
            <span className="font-semibold">Status: </span>
            {modalUser.isLoggedIn ? "Logged in" : "Logged out"}
            </div>
        </div>
        <div className="flex justify-end mt-4">
            <button
            className="bg-blue-500 text-white px-4 py-1 rounded"
            onClick={closeModal}
            >
            Close
            </button>
        </div>
        </div>
    </div>
    )}
</div> 
);
};

export default AdminPage;
