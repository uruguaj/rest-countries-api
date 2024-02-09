// css imports
import "./index.css";

// utils imports
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// components imports
import App from "./App.jsx";
import TopBar from "./components/TopBar.jsx";

// router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);

const queryClient = new QueryClient();

// Main Component
const MainApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* top "navigation" bar */}
    <TopBar />
    <MainApp />
  </React.StrictMode>
);
