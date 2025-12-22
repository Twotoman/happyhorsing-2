import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import { prisma } from "@/db/client"

export async function POST(req: Request) {
  
    const body = await req.json()

    console.log('body:',body);  

    const email = String(body.email || "").toLowerCase().trim()
    const name = String(body.name || "").trim()
    const password = String(body.password || "")

    if (!email || !password || password.length < 6) {
        return NextResponse.json({ error: "Invalid input" }, { status: 400 })
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
        return NextResponse.json({ error: "Email already in use" }, { status: 409 })
    }

    const passwordHash = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
        data: { email, name: name || null, passwordHash },
        select: { id: true, email: true, name: true },
    })

  return NextResponse.json({ user })
}
