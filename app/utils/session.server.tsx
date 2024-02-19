import { createCookieSessionStorage, redirect } from "@remix-run/node";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session", // name of the session
    sameSite: "lax",
    path: "/", 
    httpOnly: true, 
    secrets: process.env.SessionSecret,
    secure: true,
  },
});