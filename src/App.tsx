import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegisterPage from "./pages/register/RegisterPage.tsx";
import HomePage from "./pages/home/HomePage.tsx";
import Header from "./components/header/Header.tsx";
import SideBar from "./components/side-bar/SideBar.tsx";
import Sidebar from "./components/side-bar/SideBar.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />
    },
    {
        path: "/register",
        element: <RegisterPage />
    }
])

function App() {
    console.log(SideBar)

  return (
      <div>
          <Header/>
          <Sidebar />
          <div>
              <RouterProvider router={router} />
          </div>
      </div>
  )
}

export default App
