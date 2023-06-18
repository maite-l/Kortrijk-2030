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
import MySubmissions, { loader as mySubmissonsLoader } from "./routes/my-submissions";
import Submit, { loader as submitLoader } from "./routes/submit";

import Article, { action as articleAction, loader as articleLoader } from "./routes/submit/article";
import Interview, { action as interviewAction, loader as interviewLoader } from "./routes/submit/interview";
import Gossip, { action as gossipAction, loader as gossipLoader } from "./routes/submit/gossip";
import Artwork, { action as artworkAction, loader as artworkLoader } from "./routes/submit/artwork";
import Photography, { action as photographyAction, loader as photographyLoader } from "./routes/submit/photography";
import Meme, { action as memeAction, loader as memeLoader } from "./routes/submit/meme";
import Reply, { loader as replyLoader, action as replyAction } from "./routes/submit/reply";
import OpenSubmission, { action as openSubmissionAction, loader as openSubmissionLoader } from "./routes/submit/openSubmission";

import MyAccount, {loader as myAccountLoader} from "./routes/my-account";

import Login, { action as LoginAction } from "./routes/login";
import Register, { action as RegisterAction } from "./routes/register";
import { action as logOutAction } from './routes/logout';

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
            path: "/archive",
            element: <Archive />,
          },
          {
            path: "/my-submissions",
            element: <MySubmissions />,
            loader: mySubmissonsLoader,
          },
          {
            path: "/submit",
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
                loader: articleLoader,
              },
              {
                path: "interview",
                element: <Interview />,
                action: interviewAction,
                loader: interviewLoader,
              },
              {
                path: "gossip",
                element: <Gossip />,
                action: gossipAction,
                loader: gossipLoader,
              },
              {
                path: "artwork",
                element: <Artwork />,
                action: artworkAction,
                loader: artworkLoader,
              },
              {
                path: "photography",
                element: <Photography />,
                action: photographyAction,
                loader: photographyLoader,
              },
              {
                path: "meme",
                element: <Meme />,
                action: memeAction,
                loader: memeLoader,
              },
              {
                path: "open-submission",
                element: <OpenSubmission />,
                action: openSubmissionAction,
                loader: openSubmissionLoader,
              },
              {
                path: "reply",
                element: <Reply />,
                loader: replyLoader,
                action: replyAction,
              }
            ],
          },
          {
            path: "/my-account",
            element: <MyAccount />,
            loader: myAccountLoader,
            children: [
              {
                path: "logout",
                action: logOutAction,
              }
            ]
          },
          {
            path: "/login",
            element: <Login />,
            action: LoginAction,
          },
          {
            path: "/register",
            element: <Register />,
            action: RegisterAction,
          }
        ],
      },
    ],
    errorElement: <ErrorPage />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);