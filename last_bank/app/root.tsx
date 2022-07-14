import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import Layout from "./components/layout";
import UserPanel from "./components/user-panel";
import userProfile from "./components/user-profile";

import styles from "./styles/app.css";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
};

// { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" }

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Last remix Bank App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html
      lang="en"
      className="font-Condensed h-screen w-full dark:bg-zinc-700 dark:text-white"
    >
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
