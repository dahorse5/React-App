import { useEffect, useState } from 'react'; 
import { Button } from 'flowbite-react';
import { FaHeart, FaRegHeart, FaEdit } from 'react-icons/fa';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useSearch } from '../features/SearchContext';
import Card from '../interfaces/Card';
import { getAllCards } from '../services/cardsService';

const CardsPage = () => {
const { search } = useSearch();
const [cards, setCards] = useState<Card[]>([]);
const [filteredCards, setFilteredCards] = useState<Card[]>([]);
const [favorites, setFavorites] = useState<string[]>(() =>
JSON.parse(localStorage.getItem('favorites') || '[]')
);
const [loading, setLoading] = useState(true);
const [currentPage, setCurrentPage] = useState(1);
const cardsPerPage = 6;

const navigate = useNavigate();
const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
const isAdmin = useSelector((state: RootState) => state.auth.isAdmin);

useEffect(() => {
setLoading(true);
getAllCards()
    .then((res) => {
    setCards(res.data);
    setFilteredCards(res.data);
    })
    .catch(() => toast.error('Failed to load cards.'))
    .finally(() => setLoading(false));
}, []);

useEffect(() => {
if (!search) {
    setFilteredCards(cards);
    setCurrentPage(1);
} else {
    setFilteredCards(
    cards.filter(card =>
        card.title?.toLowerCase().startsWith(search.toLowerCase())
    )
    );
    setCurrentPage(1);
}
}, [search, cards]);

const toggleFavorite = (id: string) => {
const updated = favorites.includes(id)
    ? favorites.filter((f) => f !== id)
    : [...favorites, id];

setFavorites(updated);
localStorage.setItem('favorites', JSON.stringify(updated));
toast.success(favorites.includes(id) ? 'Removed from favorites' : 'Added to favorites');
};

const indexOfLastCard = currentPage * cardsPerPage;
const indexOfFirstCard = indexOfLastCard - cardsPerPage;
const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);
const totalPages = Math.ceil(filteredCards.length / cardsPerPage);

if (loading) {
return (
    <div className="flex justify-center items-center mt-20">
    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mr-2" />
    <span className="text-lg">Loading cards...</span>
    </div>
);
}

return (
<div className="container mx-auto py-8 px-4">
    <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
    Business Cards
    </h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {currentCards.map((card: Card) => (
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
            {isLoggedIn && (
            <button
                onClick={() => toggleFavorite(card._id || '')}
                className={clsx(
                'text-2xl transition-transform',
                favorites.includes(card._id || '')
                    ? 'text-red-500 scale-110'
                    : 'text-gray-400 hover:text-red-500'
                )}
            >
                {favorites.includes(card._id || '') ? <FaHeart /> : <FaRegHeart />}
            </button>
            )}
            {isAdmin && (
            <button
                title="Edit as Admin"
                onClick={() => navigate(`/edit-card/${card._id || ''}`)}
                className="text-blue-500 hover:text-blue-700 text-xl"
            >
                <FaEdit />
            </button>
            )}
        </div>
        </div>
    ))}
    </div>
    <div className="flex justify-center items-center gap-2 mt-8 flex-wrap text-sm">
    <button
        className={`px-3 py-1 rounded-md transition ${
        currentPage === 1
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-white'
        }`}
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
    >
        ‹
    </button>
    {Array.from({ length: totalPages }, (_, i) => (
        <button
        key={i}
        onClick={() => setCurrentPage(i + 1)}
        className={`w-8 h-8 rounded-full font-semibold transition ${
            currentPage === i + 1
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200'
        }`}
        >
        {i + 1}
        </button>
    ))}
    <button
        className={`px-3 py-1 rounded-md transition ${
        currentPage === totalPages
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-white'
        }`}
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
    >
        ›
    </button>
    </div>
</div>
);
};

export default CardsPage;
