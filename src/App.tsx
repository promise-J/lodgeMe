import "./App.css";
import LayoutPage from "./pages/Layout";
import Notfound from "./pages/Notfound";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
        path: '/',
        element: <LayoutPage />,
    },
    {
        path: '*',
        element: <Notfound />
    }
])


  return (
   <RouterProvider router={router} />
  );
}

export default App;
