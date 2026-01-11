'use client';
import {logout} from '@/lib/actions/auth';

export const LogoutButton = () => {
  return (
    <button onClick={() => logout()} className="mt-8 rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700">
        LOGOUT
    </button>
  );
}