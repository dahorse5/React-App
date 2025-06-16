import { Card } from 'flowbite-react';

const AboutPage = () => {
return (
<div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-100 dark:bg-gray-900">
    <Card className="w-full max-w-3xl shadow-xl bg-white dark:bg-gray-800">
    <h1 className="text-3xl font-bold text-blue-700 dark:text-white mb-2 text-center">
        About This Project
    </h1>

    <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
        👋 Hi, I'm <strong>Or Hazan</strong>, a full-stack developer passionate about building clean,
        responsive, and intuitive user interfaces. This project is a fully featured business card
        management platform built with:
    </p>

    <ul className="list-disc list-inside mt-4 text-gray-700 dark:text-gray-300 space-y-1">
        <li>🔧 <strong>React + TypeScript</strong> for a modern frontend architecture</li>
        <li>🌙 <strong>Tailwind CSS + Flowbite</strong> for fully responsive design & dark mode</li>
        <li>🔐 <strong>Role-based access control</strong> using Redux (admin, biz, regular users)</li>
        <li>❤️ Favorite cards, create cards, admin-only controls</li>
        <li>⚡ Pagination, loaders, and toast notifications for a smooth experience</li>
    </ul>

    <p className="mt-4 text-gray-700 dark:text-gray-300 text-lg">
        Whether you're just browsing, running a business, or managing the platform as an admin,
        this project is made to adapt to your role and needs — fast, responsive, and beautiful.
    </p>

    <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        Built with care by Or Hazan — © {new Date().getFullYear()} ™
    </p>
    </Card>
</div>
);
};

export default AboutPage;
