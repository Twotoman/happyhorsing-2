import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const {pathname} = nextUrl;

      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

      //protect root
      if(pathname === "/"){
        return Response.redirect(
          new URL(isLoggedIn ? "/dashboard" : "/login", nextUrl)
        );
      }

      //protect dashboard if not loggedIn
      if(pathname === "/dashboard"){
        return isLoggedIn; //in case false -> NextAuth redirects to /login (see pages)
      }

      //redirect loggedIn User
      if(pathname === "/login" && isLoggedIn){
        return Response.redirect(new URL("/dashboard",nextUrl));
      }

      //allow everything else
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;