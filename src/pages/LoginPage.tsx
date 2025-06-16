import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { loginSchema } from '../utils/validationSchemas'
import { TextInput, Button, Label } from 'flowbite-react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../features/authSlice'
import { toast } from 'react-toastify'

const LoginPage = () => {
const navigate = useNavigate()
const dispatch = useDispatch()

const {
register,
handleSubmit,
formState: { errors },
} = useForm({ resolver: joiResolver(loginSchema) })

const onSubmit = async (data: any) => {
try {
    const res = await axios.post(
    'https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login',
    data
    );
    const token = res.data.token || res.data;
    if (!token || typeof token !== 'string') {
    toast.error('Login failed: no token returned');
    return;
    }

    localStorage.setItem('authToken', token);


    const user = {
    email: data.email,
    name: {
        first: data.email === 'admin@gmail.com' ? 'Admin' : 'User',
        last: '',
    },
    biz: data.email !== 'user@gmail.com',
    }

    localStorage.setItem('authToken', token)
    localStorage.setItem('userData', JSON.stringify(user))

    dispatch(login({ user, token }))
    toast.success('Logged in!')
    navigate('/')
} catch (err) {
    console.error('Login failed:', err)
    toast.error('Invalid email or password')
}
}

return (
<div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
    <form
    onSubmit={handleSubmit(onSubmit)}
    className="w-full max-w-sm p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
    >
    <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">
        Login
    </h2>

    <div className="mb-3">
        <Label htmlFor="email">Email</Label>
        <TextInput id="email" {...register('email')} />
        {errors.email && (
        <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
    </div>

    <div className="mb-3">
        <Label htmlFor="password">Password</Label>
        <TextInput
        id="password"
        type="password"
        {...register('password')}
        />
        {errors.password && (
        <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
    </div>

    <Button type="submit" className="mt-4 w-full">
        Login
    </Button>
    </form>
</div>
)
}

export default LoginPage
