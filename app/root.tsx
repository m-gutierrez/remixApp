import bootstrapCSS from "bootstrap/dist/css/bootstrap.min.css";
import indexCSS from "index.css";
import yarlCSS from "yet-another-react-lightbox/styles.css";

import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

export const links: LinksFunction = () => [
  ...(bootstrapCSS ? [{ rel: "stylesheet", href: bootstrapCSS }] : []),
  { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/night-owl.min.css"},
  { rel: "stylesheet", href: indexCSS},
  { rel: "stylesheet", href: yarlCSS}
];


export default function App() {
  return (
    <html lang="en" data-bs-theme="light">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
