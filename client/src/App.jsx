import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from "./pages/Home"
import ChatPage from "./pages/Chat"

function App() {

  const router = createBrowserRouter([
    {index: true, element: <HomePage />},
    {path: 'chat', element: <ChatPage />}
  ])

  return (<RouterProvider router={router}/>)
}

export default App
