Welcome to the **React Cards App** project!  
This app is a full-featured digital business cards platform, built with React and TypeScript, using Flowbite for UI and Monkfish API as backend.  
Manage users, cards, favorites, and roles in a modern, beautiful, and responsive interface.

---

## 🚀 What is the Project?

- **Digital business cards platform**: Add, edit, view, and favorite business cards online.
- **User authentication and roles**: Supports User, Biz, and Admin accounts, with role-based access and actions.
- **Admin CRM dashboard**: See, edit, or delete any user as admin—real CRM control.
- **Card management**: Full CRUD (Create, Read, Update, Delete) on cards for authorized users.
- **Favorites system**: Users can like/unlike cards, with persistence.
- **Modern responsive design**: Fully mobile and desktop ready with dark mode.

---

## 🛠️ Tech Stack

- **React** (TypeScript) – Frontend SPA
- **Redux Toolkit** – App-wide state management for auth and roles
- **React Router** – Navigation and protected routes
- **Flowbite-React** – Stylish, flexible UI components
- **Axios** – API requests (with global auth interceptor)
- **Monkfish API** – Backend for users and cards (hosted on DigitalOcean)
- **React Hook Form + Joi** – Modern forms and validation
- **TailwindCSS** – Utility-first CSS for clean styling
- **React Icons** – Beautiful iconography
- **Toastify** – User notifications and alerts
- **Thunder Client / Postman** – API development & testing

---

## ✨ Main Features

- **Registration & Login** – Secure user signup/login, JWT token auth.
- **Profile page** – Edit your info, see your role, and logout securely.
- **Business cards gallery** – Paginated, filterable, and searchable card grid.
- **Favorites** – Like/unlike cards, with local and server persistence.
- **Admin dashboard** – See all users, manage roles, edit or delete users.
- **Add/Edit/Delete Cards** – Only for Biz and Admin roles.
- **Responsive design** – Works on any device, light & dark themes.

---

## 💡 How It Works

- **Login** for real user session and get a valid JWT from Monkfish API.
- All requests automatically send your token via Axios.
- **Role-based UI**: Biz users can add/edit their cards; Admins can control all.
- **Admin CRM**: Manage all users, roles, and data in one page.
- **Favorites** and pagination for great user experience.

