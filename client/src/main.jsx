import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import "./css/reset.css";

import Root, { loader as rootLoader } from "./routes/root";
import Home, { loader as homeLoader, action as homeAction } from "./routes/home";
import Archive from "./routes/archive";
import MySubmissions from "./routes/my-submissions";
import Submit from "./routes/submit";
import Gossip, { action as gossipAction } from "./routes/submit/gossip";
import Photography, { action as photographyAction } from "./routes/submit/photography";
import Meme, { action as memeAction } from "./routes/submit/meme";

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
            loader: homeLoader,
            action: homeAction,
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
              {
                path: "photography",
                element: <Photography />,
                action: photographyAction,
              },
              {
                path: "meme",
                element: <Meme />,
                action: memeAction,
              }
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