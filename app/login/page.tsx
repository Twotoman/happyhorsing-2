'use server';

import {auth} from '@/auth';
import {redirect} from "next/navigation" 
import LoginForm from '@/app/components/login/login-form'

import { Suspense } from 'react';
 
export default async function LoginPage() {

  const session = await auth();
  console.log('Session:', session);
  if (session?.user) redirect("/dashboard") 

  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-24">
          <div className="w-32 text-white md:w-100">
            hier soll ein Logo hin
          </div>
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-12" />
      </div>
    </main>
  );
}

