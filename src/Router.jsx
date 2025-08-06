import { createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout";
import Home from "./Components/Home/Home";
import History from "./Components/History/History";
import Searched from "./Components/Searched/Searched";
import Not from "./Components/Not";
import About from "./Components/About/About";
import Fav from "./Components/Fav/Fav";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "history",
        element: <Not />,
      },
      {
        path: "searched",
        element: <Searched />,
      },
      {
        path: "about/:id",
        element: <About />,
      },
      {
        path: "fav",
        element: <Fav />,
      }
    ],
  },
]);