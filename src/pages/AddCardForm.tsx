import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { TextInput, Button } from 'flowbite-react';
import { toast } from 'react-toastify';
import axiosInstance from '../utils/axiosInstance';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { createCard } from '../services/cardsService';
import Card from '../interfaces/Card';


const AddCardForm = () => {
const navigate = useNavigate();
const token = useSelector((s: RootState) => s.auth.token);
const user = useSelector((s: RootState) => s.auth.user);

const {
register,
handleSubmit,
reset,
formState: { errors },
} = useForm<Card>();

const onSubmit = async (data: Card) => {
    console.log('Current token:', localStorage.getItem('authToken'));
if (!token) {
    toast.error('Access denied.');
    return;
}

const payload: Card = {
    title: data.title,
    subtitle: data.subtitle,
    description: data.description,
    phone: data.phone,
    email: data.email,
    web: data.web,
    image: {
    url:
        data.image.url ||
        `https://picsum.photos/600/400?random=${Math.floor(Math.random() * 1000)}`,
    alt: data.image.alt || 'Placeholder',
    },
    address: {
    state: data.address.state || 'Unknown State',
    country: data.address.country,
    city: data.address.city,
    street: data.address.street,
    houseNumber: data.address.houseNumber || 0,
    zip: data.address.zip || 0,
    },
    user_id: user?._id 
};

try {
    console.log('AxiosInstance config:', axiosInstance.defaults.headers);
    const res = await createCard(payload);
    console.log(res.data);
    
    toast.success('Card created!');
    reset();
    navigate('/my-cards');
} catch (err) {
    console.error('Error creating card:', err);
}
};

return (
<form
    onSubmit={handleSubmit(onSubmit)}
    className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6"
>
    <div>
    <TextInput
        placeholder="Title *"
        {...register('title', { required: 'Title is required' })}
        color={errors.title ? 'failure' : undefined}
    />
    {errors.title && <p className="text-red-600 text-sm">{errors.title.message}</p>}
    </div>
    <div>
    <TextInput
        placeholder="Subtitle *"
        {...register('subtitle', { required: 'Subtitle is required' })}
        color={errors.subtitle ? 'failure' : undefined}
    />
    {errors.subtitle && <p className="text-red-600 text-sm">{errors.subtitle.message}</p>}
    </div>
    <div className="sm:col-span-2">
    <TextInput
        placeholder="Description *"
        {...register('description', { required: 'Description is required' })}
        color={errors.description ? 'failure' : undefined}
    />
    {errors.description && (
        <p className="text-red-600 text-sm">{errors.description.message}</p>
    )}
    </div>
    <div>
    <TextInput
        placeholder="Phone *"
        {...register('phone', { required: 'Phone is required' })}
        color={errors.phone ? 'failure' : undefined}
    />
    {errors.phone && <p className="text-red-600 text-sm">{errors.phone.message}</p>}
    </div>
    <div>
    <TextInput
        placeholder="Email *"
        {...register('email', { required: 'Email is required' })}
        color={errors.email ? 'failure' : undefined}
    />
    {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
    </div>
    <div>
    <TextInput
        placeholder="Web *"
        {...register('web', { required: 'Web is required' })}
        color={errors.web ? 'failure' : undefined}
    />
    {errors.web && <p className="text-red-600 text-sm">{errors.web.message}</p>}
    </div>
    <div>
    <TextInput placeholder="Image URL" {...register('image.url')} />
    </div>
    <div>
    <TextInput placeholder="Image Alt" {...register('image.alt')} />
    </div>
    <div>
    <TextInput
        placeholder="State *"
        {...register('address.state', { required: 'State is required' })}
        color={errors.address?.state ? 'failure' : undefined}
    />
    {errors.address?.state && <p className="text-red-600 text-sm">{errors.address?.state?.message}</p>}
    </div>
    <div>
    <TextInput
        placeholder="Country *"
        {...register('address.country', { required: 'Country is required' })}
        color={errors.address?.state ? 'failure' : undefined}
    />
    {errors.address?.country && <p className="text-red-600 text-sm">{errors.address?.country?.message}</p>}
    </div>
    <div>
    <TextInput
        placeholder="City *"
        {...register('address.city', { required: 'City is required' })}
        color={errors.address?.city ? 'failure' : undefined}
    />
    {errors.address?.city && <p className="text-red-600 text-sm">{errors.address?.city?.message}</p>}
    </div>
    <div>
    <TextInput
        placeholder="Street *"
        {...register('address.street', { required: 'Street is required' })}
        color={errors.address?.street ? 'failure' : undefined}
    />
    {errors.address?.street && <p className="text-red-600 text-sm">{errors.address?.street?.message}</p>}
    </div>
    <div>
    <TextInput
        type="number"
        placeholder="House Number *"
        {...register('address.houseNumber', { required: 'House number is required' })}
        color={errors.address?.houseNumber ? 'failure' : undefined}
    />
    {errors.address?.houseNumber && (
        <p className="text-red-600 text-sm">{errors.address?.houseNumber?.message}</p>
    )}
    </div>
    <div>
    <TextInput placeholder="Zip (optional)" {...register('address.zip')} />
    </div>
    <div className="sm:col-span-2 flex justify-between pt-4">
    <Button color="failure" type="button" onClick={() => navigate(-1)}>
        Cancel
    </Button>
    <Button type="submit">Submit</Button>
    </div>
</form>
);
};

export default AddCardForm;
