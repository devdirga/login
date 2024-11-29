"use client";

import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RootCPanel({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const signout = async () => {
    if(session) {
      await fetch("/api/logout", { method: "POST" });
      router.push("/auth/signin")
    }
  };
  useEffect(()=>{
    const gsession = async () => {
      const response = await fetch("/api/session", {
        method: "post",
        headers: {"Content-Type": "application/json"}
      });
      if (response.ok) {
        const data: Session | null = await response.json();
        setSession(data);
      } else {
        setSession(null);
      }
    };
    gsession();
  },[])
  return (
    <div>
      {session?.user.token ? 
      <Button onClick={signout}>logout from {session.user.name}</Button> : <></>  
    }
      
      {children}
    </div>
  );
}