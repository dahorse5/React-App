import { Routes, Route } from 'react-router-dom';
import CardsPage from './pages/CardsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FavoritesPage from './pages/FavoritesPage';
import MyCardsPage from './pages/MyCardsPage';
import AddCardForm from './pages/AddCardForm';
import AdminPage from './pages/AdminPage';
import RequireRole from './components/RequireRole';
import Header from './components/Header';
import Footer from './components/Footer';
import AboutPage from './pages/AboutPage';
import AdminEditCardPage from './pages/AdminEditCardPage';
import ProfilePage from './pages/ProfilePage';
import { SearchProvider } from './features/SearchContext';
import AdminEditUserPage from './pages/AdminEditUserPage';

const App = () => {
  return (
    <SearchProvider>
      <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        <Header />
        <main className="flex-grow p-4 pb-24">
          <Routes>
            <Route path="/" element={<CardsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route
              path="/favorites"
              element={
                <RequireRole roles={['regular', 'biz', 'admin']}>
                  <FavoritesPage />
                </RequireRole>
              }
            />
            <Route
              path="/my-cards"
              element={
                <RequireRole roles={['biz', 'admin']}>
                  <MyCardsPage />
                </RequireRole>
              }
            />
            <Route
              path="/create-card"
              element={
                <RequireRole roles={['biz', 'admin']}>
                  <AddCardForm />
                </RequireRole>
              }
            />
            <Route
              path="/admin"
              element={
                <RequireRole roles={['admin']}>
                  <AdminPage />
                </RequireRole>
              }
            />
            <Route
              path="/edit-card/:id"
              element={
                <RequireRole roles={['biz', 'admin']}>
                  <AdminEditCardPage />
                </RequireRole>
              }
            />
            <Route
              path="/profile"
              element={
                <RequireRole roles={[ 'biz', 'admin']}>
                  <ProfilePage />
                </RequireRole>
              }
            />
            <Route
              path="/admin-edit-user/:id"
              element={
                <RequireRole roles={['admin']}>
                  <AdminEditUserPage />
                </RequireRole>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </SearchProvider>
  );
};

export default App;
