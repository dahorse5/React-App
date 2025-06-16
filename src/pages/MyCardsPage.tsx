import { useEffect, useState } from 'react';
import { Button } from 'flowbite-react';
import { FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useSearch } from '../features/SearchContext';
import { getAllMyCards } from '../services/cardsService';
import Card from '../interfaces/Card';

const MyCardsPage = () => {
const { search } = useSearch();
const [cards, setCards] = useState<Card[]>([]);
const [filteredCards, setFilteredCards] = useState<Card[]>([]);
const [loading, setLoading] = useState<boolean>(true);

const navigate = useNavigate();
const user = useSelector((state: RootState) => state.auth.user);

useEffect(() => {
setLoading(true);
// Fetch only the user's cards (if API supports user filtering)
    getAllMyCards()
    .then((res) => {
    // Only show cards created by the current user
    setCards(res.data);
    setFilteredCards(res.data);
    })
    .catch(() => toast.error('Failed to load your cards.'))
    .finally(() => setLoading(false));
}, [user?._id]);

useEffect(() => {
if (!search) {
    setFilteredCards(cards);
} else {
    setFilteredCards(
    cards.filter(card =>
        card.title?.toLowerCase().startsWith(search.toLowerCase())
    )
    );
}
}, [search, cards]);

if (loading) {
return (
    <div className="flex justify-center items-center mt-20">
    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mr-2" />
    <span className="text-lg">Loading your cards...</span>
    </div>
);
}

return (
<div className="container mx-auto py-8 px-4">
    <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
    My Cards
    </h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {filteredCards.map((card) => (
        <div
        key={card._id}
        className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-lg shadow-md p-4 transition hover:scale-105"
        >
        <img
            src={card.image?.url || 'https://via.placeholder.com/300'}
            alt={card.image?.alt || 'Card image'}
            className="w-full h-48 object-cover rounded mb-4"
            loading="lazy"
        />
        <h2 className="text-xl font-bold">{card.title}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-300">{card.subtitle}</p>
        <p className="text-sm mb-2">{card.description}</p>
        <div className="text-sm text-gray-600 dark:text-gray-400">
            📍 {card.address?.city}, {card.address?.street} {card.address?.houseNumber}
        </div>
        <div className="text-sm">📞 {card.phone}</div>
        <div className="text-sm">✉️ {card.email}</div>
        <Button
            className="mt-3 w-full"
            color="blue"
            onClick={() => window.open(card.web, '_blank')}
        >
            Visit Website
        </Button>
        <div className="flex items-center justify-between mt-3">
            <button
            title="Edit"
            onClick={() => navigate(`/edit-card/${card._id}`)}
            className="text-blue-500 hover:text-blue-700 text-xl"
            >
            <FaEdit />
            </button>
        </div>
        </div>
    ))}
    </div>
</div>
);
};

export default MyCardsPage;
