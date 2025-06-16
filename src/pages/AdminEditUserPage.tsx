import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserById, editUser } from "../services/userService";

const defaultUserIcon = "https://cdn-icons-png.flaticon.com/512/3177/3177440.png";

const AdminEditUserPage = () => {
const { id } = useParams();
const navigate = useNavigate();
const [form, setForm] = useState(null);

useEffect(() => {
if (!id) return;
getUserById(id)
    .then((res) => {
    const user = res.data;
    setForm({
        name: {
        first: user.name?.first || "",
        middle: user.name?.middle || "",
        last: user.name?.last || "",
        },
        phone: user.phone || "",
        image: {
        url: user.profileImage || defaultUserIcon,
        alt: user.name?.first || "Profile Image",
        },
        address: {
        state: user.address?.state || "",
        country: user.address?.country || "",
        city: user.address?.city || "",
        street: user.address?.street || "",
        houseNumber: user.address?.houseNumber || "",
        zip: user.address?.zip || "",
        },
    });
    })
    .catch(() => toast.error("Failed to load user"));
}, [id]);

const handleChange = (e) => {
const { name, value } = e.target;
const [section, field] = name.split(".");
setForm((prev) => ({
    ...prev,
    [section]: {
    ...prev[section],
    [field]: value,
    },
}));
};

const handleSave = async () => {
try {
    await editUser(id, {
    name: form.name,
    phone: form.phone,
    image: {
        url: form.image.url,
        alt: form.image.alt,
    },
    address: form.address,
    });
    toast.success("User updated");
    navigate("/admin");
} catch {
    toast.error("Failed to update user");
}
};

if (!form) return <div className="p-4">Loading...</div>;

return (
<div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded shadow mt-10">
    <h2 className="text-2xl font-bold mb-4">Edit User</h2>

    {/* Name */}
    {["first", "middle", "last"].map((field) => (
    <div className="mb-4" key={field}>
        <label className="block mb-1 font-semibold capitalize">{field} Name:</label>
        <input
        name={`name.${field}`}
        value={form.name[field]}
        onChange={handleChange}
        className="w-full border p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
    </div>
    ))}

    {/* Phone */}
    <div className="mb-4">
    <label className="block mb-1 font-semibold">Phone:</label>
    <input
        name="phone"
        value={form.phone}
        onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
        className="w-full border p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
    />
    </div>

    {/* Image */}
    {["url", "alt"].map((field) => (
    <div className="mb-4" key={field}>
        <label className="block mb-1 font-semibold capitalize">Image {field}:</label>
        <input
        name={`image.${field}`}
        value={form.image[field]}
        onChange={handleChange}
        className="w-full border p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
    </div>
    ))}

    {/* Address */}
    {Object.keys(form.address).map((field) => (
    <div className="mb-4" key={field}>
        <label className="block mb-1 font-semibold capitalize">{field}:</label>
        <input
        name={`address.${field}`}
        value={form.address[field]}
        onChange={handleChange}
        className="w-full border p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
    </div>
    ))}

    <div className="flex gap-2 justify-end mt-6">
    <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
        Save
    </button>
    <button
        onClick={() => navigate("/admin")}
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
    >
        Cancel
    </button>
    </div>
</div>
);
};

export default AdminEditUserPage;
