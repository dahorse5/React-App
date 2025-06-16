import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";
import { toast } from "react-toastify";
import { editUser } from "../services/userService";
import { RootState } from "../store/store";

const defaultUserIcon = "https://cdn-icons-png.flaticon.com/512/3177/3177440.png";

const ProfilePage = () => {
const navigate = useNavigate();
const dispatch = useDispatch();
const reduxUser = useSelector((state: RootState) => state.auth.user);
const user = reduxUser || JSON.parse(localStorage.getItem("userData") || "{}");
const userId = user._id || user.id || user.id || user._id || user.id || "Id Not Found";

const [editing, setEditing] = useState<boolean>(false);
const [form, setForm] = useState({
name: {
    first: user.name?.first || "",
    middle: user.name?.middle || "",
    last: user.name?.last || "",
},
phone: user.phone || "",
image: {
    url: user.profileImage || "",
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

const handleEdit = () => setEditing(true);

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
const { name, value } = e.target;

// Nested handling
if (name.startsWith("name.")) {
    const key = name.split(".")[1];
    setForm((prev) => ({
    ...prev,
    name: { ...prev.name, [key]: value },
    }));
} else if (name.startsWith("image.")) {
    const key = name.split(".")[1];
    setForm((prev) => ({
    ...prev,
    image: { ...prev.image, [key]: value },
    }));
} else if (name.startsWith("address.")) {
    const key = name.split(".")[1];
    setForm((prev) => ({
    ...prev,
    address: { ...prev.address, [key]: value },
    }));
} else {
    setForm((prev) => ({ ...prev, [name]: value }));
}
};

const handleSave = async () => {
try {
    await editUser(userId as string, {
    name: form.name,
    phone: form.phone,
    image: form.image,
    address: form.address,
    });

    localStorage.setItem(
    "userData",
    JSON.stringify({
        name: form.name,
        phone: form.phone,
        profileImage: form.image.url,
        address: form.address,
    })
    );

    toast.success("Profile updated!");
    setEditing(false);
} catch {
    toast.error("Failed to update profile.");
}
};

const handleLogout = () => {
localStorage.removeItem("authToken");
localStorage.removeItem("userData");
dispatch(logout());
navigate("/login");
};

return (
<div className="max-w-xl mx-auto bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow p-8 rounded mt-10">
    <h2 className="text-2xl font-bold mb-6">My Profile</h2>
    <div className="flex justify-center mb-6">
    <img
        src={form.image.url || defaultUserIcon}
        alt={form.image.alt}
        className="w-24 h-24 rounded-full border object-cover"
        onError={(e) => {
        e.currentTarget.src = defaultUserIcon;
        }}
    />
    </div>

    {/* --- Profile Fields --- */}
    {editing ? (
    <>
        {/* Name */}
        {["first", "middle", "last"].map((field) => (
        <div className="mb-4" key={field}>
            <label className="block mb-1 font-semibold capitalize">{field} Name:</label>
            <input
            name={`name.${field}`}
            value={form.name[field as keyof typeof form.name]}
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
            onChange={handleChange}
            className="w-full border p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        </div>

        {/* Image */}
        {["url", "alt"].map((field) => (
        <div className="mb-4" key={field}>
            <label className="block mb-1 font-semibold">Image {field.toUpperCase()}:</label>
            <input
            name={`image.${field}`}
            value={form.image[field as keyof typeof form.image]}
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
            value={form.address[field as keyof typeof form.address]}
            onChange={handleChange}
            className="w-full border p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
        </div>
        ))}
    </>
    ) : (
    <>
        <div className="mb-2">
        <strong>Name:</strong>{" "}
        {[form.name.first, form.name.middle, form.name.last].filter(Boolean).join(" ")}
        </div>
        <div className="mb-2">
        <strong>Phone:</strong> {form.phone}
        </div>
        <div className="mb-2">
        <strong>Image URL:</strong> {form.image.url}
        </div>
        <div className="mb-2">
        <strong>Image ALT:</strong> {form.image.alt}
        </div>
        <div className="mb-2">
        <strong>Address:</strong>{" "}
        {[form.address.street, form.address.houseNumber, form.address.city, form.address.state, form.address.zip, form.address.country]
            .filter(Boolean)
            .join(", ")}
        </div>
    </>
    )}

    {/* --- Roles --- */}
    <div className="mb-4">
    <label className="block mb-1 font-semibold">Roles:</label>
    <p>
        {user.isAdmin && "Admin"}
        {user.isAdmin && user.isBiz && " & "}
        {user.isBiz && "Business"}
        {!user.isAdmin && !user.isBiz && "Regular User"}
    </p>
    </div>

    {/* --- Action Buttons --- */}
    <div className="flex gap-2">
    {editing ? (
        <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleSave}
        >
        Save
        </button>
    ) : (
        <button
        className="bg-gray-600 text-white px-4 py-2 rounded"
        onClick={handleEdit}
        >
        Edit
        </button>
    )}
    <button
        className="bg-red-600 text-white px-4 py-2 rounded"
        onClick={handleLogout}
    >
        Logout
    </button>
    </div>
</div>
);
};

export default ProfilePage;
