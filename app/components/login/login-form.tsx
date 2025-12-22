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
    <div style={{ maxWidth: 360, margin: "48px auto", display: "grid", gap: 12 }}>
      <h1>{mode === "login" ? "Login" : "Register"}</h1>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 10 }}>
        <label>
          Email
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
        </label>

        {mode === "register" && (
          <label>
            Name (optional)
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" />
          </label>
        )}

        <label>
          Password
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            minLength={6}
          />
        </label>

        {error && <p style={{ color: "crimson" }}>{error}</p>}

        <button disabled={loading} type="submit">
          {loading ? "..." : mode === "login" ? "Login" : "Create account"}
        </button>
      </form>

      <button
        type="button"
        onClick={() => setMode((m) => (m === "login" ? "register" : "login"))}
      >
        Switch to {mode === "login" ? "Register" : "Login"}
      </button>

      <hr />

      <button
        type="button"
        onClick={() => login('github')}
      >
        Continue with GitHub
      </button>
            <button
        type="button"
        onClick={() => login('google')}
      >
        Continue with Google
      </button>
    </div>
  )
}
