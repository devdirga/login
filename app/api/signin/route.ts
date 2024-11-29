import { User } from "@/model/user";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    
    const body: User = await req.json();
    const { email, password } = body;
    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }
    const client = await clientPromise;
    const db = client.db(process.env.DB);
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "email not exist" }, { status: 401 });
    }
    console.log("user found!!!");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "invalid password" }, { status: 401 });
    }

    console.log({user});
    const token = jwt.sign(
      { 
        id: user.id, 
        username:user.email,
        // role: user.role,
      },
      process.env.SECRET_KEY!,
      { expiresIn: "1h" }
    );
    return NextResponse.json({
      error: false,
      message: "success",
      data: { user, token: token },
    });
  } catch (error) {
    return NextResponse.json({ error: true, message: error });
  }
}
