import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, TextInput } from 'flowbite-react';
import { toast } from 'react-toastify';

const EditCardForm = () => {
const { id } = useParams();
const navigate = useNavigate();
const { token, isAdmin, user } = useAuth();
const [loading, setLoading] = useState(true);
const { register, handleSubmit, setValue } = useForm();

useEffect(() => {
if (!id || !token) return;

axios
    .get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
    const card = res.data;

    // Authorization check
    if (!isAdmin && card.user_id !== user?._id) {
        toast.error('You do not have permission to edit this card.');
        return navigate('/');
    }

    // Set form fields
    Object.entries({
        title: card.title,
        subtitle: card.subtitle,
        description: card.description,
        phone: card.phone,
        email: card.email,
        web: card.web,
        imageUrl: card.image?.url,
        imageAlt: card.image?.alt,
        state: card.address?.state,
        country: card.address?.country,
        city: card.address?.city,
        street: card.address?.street,
        houseNumber: card.address?.houseNumber,
        zip: card.address?.zip,
    }).forEach(([key, val]) => setValue(key, val));

    setLoading(false);
    })
    .catch((err) => {
    toast.error('Failed to load card.');
    console.error(err);
    });
}, [id, token]);

const onSubmit = async (data: any) => {
try {
    await axios.put(
    `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`,
    {
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        phone: data.phone,
        email: data.email,
        web: data.web,
        image: { url: data.imageUrl, alt: data.imageAlt },
        address: {
        state: data.state,
        country: data.country,
        city: data.city,
        street: data.street,
        houseNumber: parseInt(data.houseNumber),
        zip: data.zip,
        },
    },
    {
        headers: { Authorization: `Bearer ${token}` },
    }
    );

    toast.success('Card updated successfully!');
    navigate('/my-cards');
} catch (err) {
    toast.error('Update failed. Please try again.');
}
};

if (loading) return <p className="text-center py-10">Loading...</p>;

return (
<div className="max-w-4xl mx-auto py-10 px-4 bg-blue-50 dark:bg-gray-900 rounded-md shadow-md">
    <h1 className="text-2xl font-bold text-center text-blue-900 dark:text-white mb-6">
    EDIT CARD
    </h1>

    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <TextInput {...register('title')} required placeholder="Title *" />
    <TextInput {...register('subtitle')} required placeholder="Subtitle *" />
    <TextInput {...register('description')} required placeholder="Description *" />
    <TextInput {...register('phone')} required placeholder="Phone *" />
    <TextInput {...register('email')} required placeholder="Email *" />
    <TextInput {...register('web')} placeholder="Web" />
    <TextInput {...register('imageUrl')} placeholder="Image URL" />
    <TextInput {...register('imageAlt')} placeholder="Image Alt" />
    <TextInput {...register('state')} required placeholder="State *" />
    <TextInput {...register('country')} required placeholder="Country *" />
    <TextInput {...register('city')} required placeholder="City *" />
    <TextInput {...register('street')} required placeholder="Street *" />
    <TextInput {...register('houseNumber')} required placeholder="House number *" />
    <TextInput {...register('zip')} placeholder="Zip" />

    <div className="col-span-1 sm:col-span-2 flex justify-between mt-6">
        <Button type="button" color="failure" onClick={() => navigate(-1)}>Cancel</Button>
        <Button type="submit">Save</Button>
    </div>
    </form>
</div>
);
};

export default EditCardForm;
