'use client';
import {  signOut } from "next-auth/react"
export default function SignOutButton({ children }: { children: React.ReactNode }) {

  
  return (
    <form
      action={async () => {
        await signOut();
      }}
    >
      <p>{children}</p>
      <button type="submit">Sign out</button>
    </form>
  );
}
