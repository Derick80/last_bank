import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import styles from './styles/app.css'

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: styles,
    }, { rel: "stylesheet", href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
    {
      rel: "stylesheet", href: 'https://fonts.googleapis.com/icon?family=Material+Icons+Outlined'
    },
  ];
};
export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Last remix Bank App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App () {
  return (
    <html lang="en" className='h-screen w-full bg-zinc-800'>
      <head>
        <Meta />
        <Links />
      </head>
      <body >
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
