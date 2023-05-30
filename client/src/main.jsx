import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import "./css/reset.css";

import Root, { loader as rootLoader } from "./routes/root";
import Home from "./routes/home";
import Archive from "./routes/archive";
import Profile from "./routes/profile";
import SubmitOverview from "./routes/submit-overview";

import ErrorPage from "./routes/error-page";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "archive",
            element: <Archive />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "submit-overview",
            element: <SubmitOverview />,
          },
        ],
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);