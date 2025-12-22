'use server';

import {signIn, signOut} from '@/auth';

type AuthProvider = 'github' | 'google';

export const login = async (provider: AuthProvider) => {
  
    await signIn(provider, {redirectTo: '/'});
    console.log('Login function called');
};

export const logout = async () => {
  await signOut({redirectTo: '/login'});
  console.log('Logout function called');
};