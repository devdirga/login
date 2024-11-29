import { NextResponse } from "next/server";
import { signOut } from "@/auth";

export async function POST() {
  await signOut({
    redirectTo: "/auth/signin",
  });
  return NextResponse.redirect("/auth/signin");
}
