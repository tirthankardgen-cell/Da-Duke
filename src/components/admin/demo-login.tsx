"use client";

import { useState, useSyncExternalStore, type FormEvent } from "react";
import Link from "next/link";
import { Arrow } from "@/components/illustrations";
import HeritageSketch, { InkStudy } from "@/components/heritage-sketch";

const KEY = "da-duke-demo-access";
const listeners = new Set<() => void>();
let memoryAccess = false;
const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};
function getAccess() {
  try {
    return sessionStorage.getItem(KEY) === "demo" || memoryAccess;
  } catch {
    return memoryAccess;
  }
}
export function useDemoAccess() {
  return useSyncExternalStore(subscribe, getAccess, () => false);
}
export function setDemoAccess(access: boolean) {
  memoryAccess = access;
  try {
    if (access) sessionStorage.setItem(KEY, "demo");
    else sessionStorage.removeItem(KEY);
  } catch {
    /* A memory session still lets the user try the demo. */
  }
  listeners.forEach((notify) => notify());
}

export default function DemoLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (
      email.trim().toLowerCase() !== "owner@daduke.demo" ||
      password !== "ChaiWithDuke"
    ) {
      setError(
        "Use the demonstration credentials shown below to enter the CMS preview.",
      );
      return;
    }
    setDemoAccess(true);
  }
  return (
    <main className="admin-login">
      <div className="login-story">
        <HeritageSketch kind="hills" />
        <Link href="/" className="wordmark">
          <span className="brand-name">Da Duke</span>
          <span className="brand-subtitle">and Chai</span>
        </Link>
        <div>
          <p className="eyebrow">BEHIND THE HOUSE</p>
          <h1>
            A little care.
            <br />
            <em>In every detail.</em>
          </h1>
          <p>
            Your space to shape the stories, gatherings and little moments that
            make the house.
          </p>
        </div>
        <InkStudy kind="florence" className="login-illustration" />
        <span className="login-footnote">
          THE CONTENT STUDIO · A DEMONSTRATION
        </span>
      </div>
      <div className="login-panel">
        <Link className="admin-back-link" href="/">
          ← Back to the website
        </Link>
        <div className="login-form-wrap">
          <p className="eyebrow">WELCOME TO THE CONTENT STUDIO</p>
          <h2>
            Make yourself
            <br />
            <em>at home.</em>
          </h2>
          <p>Sign in to explore the CMS demonstration.</p>
          <form onSubmit={login} className="admin-form">
            <label>
              Email address
              <input
                type="email"
                autoComplete="off"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError("");
                }}
                required
                placeholder="owner@daduke.demo"
              />
            </label>
            <label>
              Password
              <input
                type="password"
                autoComplete="off"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError("");
                }}
                required
                placeholder="Your demo password"
              />
            </label>
            {error && (
              <p className="admin-error" role="alert">
                {error}
              </p>
            )}
            <button className="button button-green" type="submit">
              Enter the studio
              <Arrow />
            </button>
          </form>
          <div className="demo-credentials">
            <span className="eyebrow">YOUR DEMO ACCESS</span>
            <p>
              <span>Email</span>
              <code>owner@daduke.demo</code>
            </p>
            <p>
              <span>Password</span>
              <code>ChaiWithDuke</code>
            </p>
            <button
              type="button"
              onClick={() => {
                setEmail("owner@daduke.demo");
                setPassword("ChaiWithDuke");
                setError("");
              }}
            >
              Use demo credentials
              <Arrow />
            </button>
          </div>
          <p className="admin-local-note">
            A browser-only preview, with publicly shared demo access. This is
            not secure authentication. Content, images and statistics stay in
            this browser; use sample information only.
          </p>
        </div>
      </div>
    </main>
  );
}
