import { NextResponse } from "next/server"
import { getUsers } from "@/lib/users-storage"

export async function GET() {
  try {
    console.log("[v0] API get-users chamada")

    const users = getUsers()

    console.log("[v0] Usuários encontrados:", users.length)
    console.log("[v0] Dados dos usuários:", users)

    return NextResponse.json(users)
  } catch (error) {
    console.error("[v0] Erro ao ler usuários:", error)
    return NextResponse.json([])
  }
}
