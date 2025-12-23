"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { AuthError } from 'next-auth';
import {login} from '@/lib/actions/auth'

export default function LoginForm() {
  const [mode, setMode] = useState<"login" | "register">("login")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    console.log('bereite login vor');

    if (mode === "register") {
        try {
            if (mode === "register") {
                const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, name, password }),
                })
                const json = await res.json()
                if (!res.ok) {
                setError(json?.error ?? "Registration failed")
                return
                }
            }
        } catch (error) {
            if (error instanceof AuthError) {
            switch (error.type) {
                default:
                return 'Could not create User';
            }
            }
            //throw error;
        }
        finally {
            setLoading(false)
        }
    }
    if(mode === "login"){
        console.log('versuche einzuloggen');
        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: true,
            })
        } catch (error) {
            console.log('login fehlgeschlagen');
            if (error instanceof AuthError) {
                switch (error.type) {
                    case 'CredentialsSignin':
                    return 'Invalid credentials.';
                    default:
                    return 'Something went wrong.';
                }
            }
            //throw error;
        } finally {
            setLoading(false)
        }
    }
  }

  return (
    <div className="mx-auto mt-12 grid max-w-sm gap-3">
        <h1 className="text-2xl font-semibold">
            {mode === "login" ? "Login" : "Register"}
        </h1>

        <form onSubmit={onSubmit} className="grid gap-2.5">
            <label className="grid gap-1 text-sm">
            Email
            <input
                className="rounded border px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
            />
            </label>

            {mode === "register" && (
            <label className="grid gap-1 text-sm">
                Name (optional)
                <input
                className="rounded border px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                />
            </label>
            )}

            <label className="grid gap-1 text-sm">
            Password
            <input
                className="rounded border px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
                minLength={6}
            />
            </label>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
            disabled={loading}
            type="submit"
            className="rounded bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
            >
            {loading ? "..." : mode === "login" ? "Login" : "Create account"}
            </button>
        </form>

        <button
            type="button"
            onClick={() => setMode((m) => (m === "login" ? "register" : "login"))}
            className="text-sm text-blue-600 hover:underline"
        >
            Switch to {mode === "login" ? "Register" : "Login"}
        </button>

        <hr className="my-2" />

        <button
            type="button"
            onClick={() => login("github")}
            className="rounded border py-2 hover:bg-gray-50"
        >
            Continue with GitHub
        </button>

        <button
            type="button"
            onClick={() => login("google")}
            className="rounded border py-2 hover:bg-gray-50"
        >
            Continue with Google
        </button>
        </div>
  )
}
