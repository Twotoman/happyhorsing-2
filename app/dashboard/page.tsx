'use server';

import {auth} from '@/auth/auth';
import Image from 'next/image';
import { LogoutButton } from '@/components/login/logout-button';
import { redirect } from "next/navigation" 

export default async function Home() {

    const session = await auth();
    //console.log('Session:', session);
    if (!session?.user) redirect("/login")

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
            <div className="w-full">
            <h1 className="text-5xl font-bold text-zinc-900 dark:text-zinc-100">
                Welcome back, <span className="text-blue-600">{session?.user?.name}</span> 
                {session?.user?.image &&
                <Image src={session.user.image} alt="User Avatar" width={48} height={48} style={{borderRadius: "50%"}}/> 
                }  
            </h1>
            <LogoutButton />
            </div>
        </main>
        </div>
    );

}