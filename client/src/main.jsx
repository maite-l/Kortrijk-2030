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
import MySubmissions from "./routes/my-submissions";
import Submit from "./routes/submit";
import Gossip, { action as gossipAction } from "./routes/submit/gossip";

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
            path: "my-submissions",
            element: <MySubmissions />,
          },
          {
            path: "submit",
            children: [
              {
                index: true,
                element: <Submit />,
              },
              {
                path: "gossip",
                element: <Gossip />,
                action: gossipAction,
              },
            ],
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