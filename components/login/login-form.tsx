"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { AuthError } from 'next-auth';
import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import {login} from '@/lib/actions/auth'
import Image from "next/image"

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
                await signIn("credentials", {
                    email,
                    password,
                    callbackUrl: "/dashboard",
                 })

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
    <div className="grid grid-cols-1 mx-auto mt-12 max-w-sm gap-3">
        <div className="flex items-end gap-1 justify-left ml-1">
            <Image
                src="/logos/horsing-logo.png"
                alt="Logo"
                width={1536}
                height={1024}
                className="block dark:hidden h-15 w-auto"
                sizes="auto"
                />
            <Image
                src="/logos/horsing-logo-dark.png"
                alt="Logo"
                width={1536}
                height={1024}
                className="hidden dark:block h-15 w-auto"
                sizes="auto"
            />
            <h1 className="text-2xl font-semibold">
                {mode === "login" ? "Login" : "Register"}
            </h1>
        </div>

        <form onSubmit={onSubmit} className="grid gap-2.5">
            <label className="grid grid gap-1 text-sm">
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
            className="rounded bg-foreground py-2 text-background hover:bg-foreground-muted disabled:opacity-50"
            >
            {loading ? "..." : mode === "login" ? "Login" : "Create account"}
            </button>
        </form>

        <button
            type="button"
            onClick={() => setMode((m) => (m === "login" ? "register" : "login"))}
            className="text-sm text-foreground hover:underline"
        >
            Switch to {mode === "login" ? "Register" : "Login"}
        </button>

        <hr className="my-2" />

        <button
            type="button"
            onClick={() => login("github")}
            className="inline-flex w-full items-center justify-center gap-2 rounded border py-2 text-foreground hover:bg-gray-50"
        >
            <FaGithub className="h-5 w-5" aria-hidden="true" />
            <span>Continue with GitHub</span>
        </button>

        <button
            type="button"
            onClick={() => login("google")}
            className="inline-flex w-full items-center justify-center gap-2 rounded border py-2 text-foreground hover:bg-gray-50"
        >
            <FcGoogle className="h-5 w-5" aria-hidden="true" />
            <span>Continue with Google</span>
        </button>
    </div>
  )
}
