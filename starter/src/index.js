import React from "react";
import "./index.css";
import App from "./App";
import ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router";
import SearchBooks from "./components/SearchBooks/SearchBooks";

const domNode = document.getElementById('root');

const router = createBrowserRouter([
    { path: "/", Component: App },
    { path: "/search", Component: App }
]);

ReactDOM.createRoot(domNode).render(
    <RouterProvider router={router} />
);
