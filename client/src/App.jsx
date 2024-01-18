import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/Home';
import ChatPage from './pages/Chat';
import RootLayout from './pages/Root';
import LoginPage from './pages/Login';
import { userLoader } from './utils/loaders';

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <RootLayout />,
            loader: userLoader,
            children: [
                { index: true, element: <HomePage /> },
                {path: 'login', element: <LoginPage />},
                { path: 'chat', element: <ChatPage /> },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
