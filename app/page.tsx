'use server';

import { auth } from "@/auth/auth" 
import { redirect } from "next/navigation" 

export default async function Home() {
  
  //protect root
  const session = await auth()
  console.log("SESSION:", session)

  redirect(session?.user ? "/dashboard" : "/login") 

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="w-full">
          <h1 className="text-5xl font-bold text-zinc-900 dark:text-zinc-100">
            Welcome to <span className="text-blue-600">NextAuth.js</span>
          </h1>
        </div>
      </main>
    </div>
  );
}
