import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import "./css/reset.css";
import "./css/style.css";

import Root, { loader as rootLoader } from "./routes/root";
import Home, { loader as homeLoader, action as homeAction } from "./routes/home";
import Archive from "./routes/archive";
import MySubmissions from "./routes/my-submissions";
import Submit, { loader as submitLoader } from "./routes/submit";
import Article, { action as articleAction } from "./routes/submit/article";
import Interview, { action as interviewAction } from "./routes/submit/interview";
import Gossip, { action as gossipAction } from "./routes/submit/gossip";
import Artwork, { action as artworkAction } from "./routes/submit/artwork";
import Photography, { action as photographyAction } from "./routes/submit/photography";
import Meme, { action as memeAction } from "./routes/submit/meme";
import Reply, { loader as replyLoader, action as replyAction } from "./routes/submit/reply";
import OpenSubmission, { action as openSubmissionAction} from "./routes/submit/openSubmission";

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
                loader: submitLoader,
              },
              {
                path: "article",
                element: <Article />,
                action: articleAction,
              },
              {
                path: "interview",
                element: <Interview />,
                action: interviewAction,
              },
              {
                path: "gossip",
                element: <Gossip />,
                action: gossipAction,
              },
              {
                path: "artwork",
                element: <Artwork />,
                action: artworkAction,
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
              },
              {
                path: "open-submission",
                element: <OpenSubmission />,
                action: openSubmissionAction,
              },
              {
                path: "reply",
                element: <Reply />,
                loader: replyLoader,
                action: replyAction,
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