import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams, useNavigate } from 'react-router-dom'
import { TextInput, Button, Modal } from 'flowbite-react'
import { toast } from 'react-toastify'
import Card from '../interfaces/Card'
import { deleteCard, editCard, getCardById } from '../services/cardsService'

const AdminEditCardPage = () => {
const { id } = useParams<{ id: string }>()
const navigate = useNavigate()

const {
register,
handleSubmit,
setValue,
formState: { errors },
} = useForm<Card>()
const [imagePreview, setImagePreview] = useState('')
const [showDeleteModal, setShowDeleteModal] = useState(false)

useEffect(() => {
    getCardById(id as string)
    .then((res) => {
    const c = res.data
    setValue('title', c.title)
    setValue('subtitle', c.subtitle)
    setValue('description', c.description)
    setValue('phone', c.phone)
    setValue('email', c.email)
    setValue('web', c.web)
    setValue('image.url', c.image?.url)
    setValue('image.alt', c.image?.alt)
    setValue('address.state', c.address?.state)
    setValue('address.country', c.address?.country)
    setValue('address.city', c.address?.city)
    setValue('address.street', c.address?.street)
    setValue('address.houseNumber', c.address?.houseNumber.toString())
    setValue('address.zip', c.address?.zip)
    setImagePreview(c.image?.url || '')
    })
    .catch(() => {
    toast.error('Failed to load card')
    navigate('/')
    })
}, [setValue])


const onSubmit = async (data: Card) => {
const payload = {
    title: data.title,
    subtitle: data.subtitle,
    description: data.description,
    phone: data.phone,
    email: data.email,
    web: data.web,
    image: { url: data.image.url || '', alt: data.image.alt || '' },
    address: {
    state: data.address.state,
    country: data.address.country,
    city: data.address.city,
    street: data.address.street,
    houseNumber: data.address.houseNumber,
    zip: data.address.zip || 0,
    },
}
try {
    await editCard(id as string, payload)
    toast.success('Card updated!')
    navigate('/')
} catch {
    toast.error('Failed to update card.')
}
}

const handleDelete = async () => {
try {
    await deleteCard(id as string)
    toast.success('Card deleted!')
    navigate('/my-cards')
} catch {
    toast.error('Failed to delete card.')
} finally {
    setShowDeleteModal(false)
}
}

return (
<div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow">
    <h1 className="text-2xl font-bold mb-4">Edit Card</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    {imagePreview && (
        <img
        src={imagePreview}
        alt="Preview"
        className="w-full h-64 object-cover rounded"
        />
    )}
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
        {errors.subtitle && (
            <p className="text-red-600 text-sm">{errors.subtitle.message}</p>
        )}
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
            color={errors.address?.country ? 'failure' : undefined}
        />
        {errors.address?.country && <p className="text-red-600 text-sm">{errors.address?.country.message}</p>}
        </div>

        <div>
        <TextInput
            placeholder="City *"
            {...register('address.city', { required: 'City is required' })}
            color={errors.address?.city ? 'failure' : undefined}
        />
        {errors.address?.city && <p className="text-red-600 text-sm">{errors.address?.city.message}</p>}
        </div>

        <div>
        <TextInput
            placeholder="Street *"
            {...register('address.street', { required: 'Street is required' })}
            color={errors.address?.street ? 'failure' : undefined}
        />
        {errors.address?.street && <p className="text-red-600 text-sm">{errors.address.street.message}</p>}
        </div>

        <div>
        <TextInput
            type="number"
            placeholder="House Number *"
            {...register('address.houseNumber', {
            required: 'House number is required',
            })}
            color={errors.address?.houseNumber ? 'failure' : undefined}
        />
        {errors.address?.houseNumber && (
            <p className="text-red-600 text-sm">{errors.address.houseNumber.message}</p>
        )}
        </div>

        <div>
        <TextInput placeholder="Zip (optional)" {...register('address.zip')} />
        </div>

        <div className="sm:col-span-2 flex justify-between pt-4">
        <Button color="failure" onClick={() => setShowDeleteModal(true)}>
            Delete
        </Button>
        <Button type="submit">Save</Button>
        </div>
    </form>
    </div>

<Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
    <div className="p-6">
    <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Confirm Deletion</h3>
    <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">Are you sure you want to delete this card?</p>
    <div className="flex justify-end gap-2">
        <Button color="gray" onClick={() => setShowDeleteModal(false)}>
        Cancel
        </Button>
        <Button color="failure" onClick={handleDelete}>
        Yes, Delete
        </Button>
    </div>
    </div>
</Modal>
</div>
)
}

export default AdminEditCardPage
