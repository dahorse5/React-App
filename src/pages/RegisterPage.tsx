import { useForm } from 'react-hook-form';
import { TextInput, Button, Label, Checkbox } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

const RegisterPage = () => {
const navigate = useNavigate();
const [isBusiness, setIsBusiness] = useState(false);

const {
register,
handleSubmit,
reset,
formState: { errors },
} = useForm();

const onSubmit = async (data: any) => {
const payload = {
    name: {
    first: data.firstName,
    middle: data.middleName || '',
    last: data.lastName,
    },
    phone: data.phone,
    email: data.email,
    password: data.password,
    image: {
    url: data.imageUrl || '',
    alt: data.imageAlt || '',
    },
    address: {
    state: data.state,
    country: data.country,
    city: data.city,
    street: data.street,
    houseNumber: parseInt(data.houseNumber),
    zip: data.zip || '',
    },
    isBusiness: !!isBusiness,}
    ;

try {
    await axios.post(
    'https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users',
    payload
    );
    toast.success('Registration successful!');
    navigate('/login');
} catch (err: any) {
    console.error('❌ Registration Error:', err.response?.data || err.message);
    toast.error('Registration failed: ' + (err.response?.data || err.message));
}
};

return (
<div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
    <form
    onSubmit={handleSubmit(onSubmit)}
    className="w-full max-w-2xl p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
    <h2 className="text-2xl font-bold text-center col-span-2 text-gray-800 dark:text-white mb-4">
        Register
    </h2>

    {/* Name */}
    <TextInput {...register('firstName')} required placeholder="First Name *" />
    <TextInput {...register('middleName')} placeholder="Middle Name" />
    <TextInput {...register('lastName')} required placeholder="Last Name *" />

    {/* Contact */}
    <TextInput {...register('email')} type="email" required placeholder="Email *" />
    <TextInput {...register('password')} type="password" required placeholder="Password *" />
    <TextInput {...register('confirmPassword')} type="password" required placeholder="Confirm Password *" />
    <TextInput {...register('phone')} required placeholder="Phone *" />

    {/* Image */}
    <TextInput {...register('imageUrl')} placeholder="Image URL" />
    <TextInput {...register('imageAlt')} placeholder="Image Alt" />

    {/* Address */}
    <TextInput {...register('state')} required placeholder="State *" />
    <TextInput {...register('country')} required placeholder="Country *" />
    <TextInput {...register('city')} required placeholder="City *" />
    <TextInput {...register('street')} required placeholder="Street *" />
    <TextInput {...register('houseNumber')} required placeholder="House Number *" />
    <TextInput {...register('zip')} placeholder="Zip" />

    {/* Business checkbox */}
    <div className="flex items-center gap-2 col-span-2 mt-2">
        <Checkbox
        id="biz"
        checked={isBusiness}
        onChange={() => setIsBusiness(!isBusiness)}
        />
        <Label htmlFor="biz" className="text-sm dark:text-white">
        Register as Business
        </Label>
    </div>

    <div className="col-span-2 flex justify-between gap-4 mt-4">
        <Button color="failure" type="button" onClick={() => reset()}>
        Reset
        </Button>
        <Button type="submit">Register</Button>
    </div>
    </form>
</div>
);
};

export default RegisterPage;
