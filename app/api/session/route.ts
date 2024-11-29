import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { Session } from "next-auth";

export async function POST() {
  const session: Session | null = await auth();
  return NextResponse.json(session);
}